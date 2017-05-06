# coding=utf-8
import json

from django.http import HttpResponse

from laboratorio.views import LaboratorioException
from ..models import Proyecto, Experimento, ProyectoExperimento
from ..views import ContenidoJsonBaseView, LaboratorioBaseView


class ProyectoView(ContenidoJsonBaseView):
    def __init__(self):
        self.model = Proyecto

    def pre_validar_creacion(self, request, *args, **kwargs):
        map = json.loads(request.body)
        identificador_ = map['identificador']
        count = Proyecto.objects.filter(contenido__contains='"identificador": "' + identificador_ + '"').count()
        if count > 0:
            raise LaboratorioException(
                "El Proyecto con Identificador " + identificador_ + " ya existe en el Laboratorio")

    def pre_validar_actualizacion(self, request, *args, **kwargs):
        pass


class ProyectoExperimentoView(LaboratorioBaseView):
    def get(self, request, id_proyecto=None, *args, **kwargs):
        """
        Entrega la informacion de los experimentos de un proyecto y su progreso
        :param id_proyecto:
        """
        contenido_modelo = ProyectoExperimento.objects.filter(proyecto__id=id_proyecto).values("experimento__contenido",
                                                                                               "contenido")
        lista = map(
            lambda elem:
            {
                'experimento': json.loads(elem["experimento__contenido"]),
                'progreso': json.loads(elem["contenido"]
                                       )},
            contenido_modelo)
        return HttpResponse(json.dumps(lista), content_type="application/json")

    def post(self, request, id_proyecto=None, id_experimento=None, *args, **kwargs):
        """
        Crea la relacion entre un experimento y un proyecto y almacena el contenido del progreso
        :param id_proyecto: requerido
        :param id_experimento: requerido
        """
        self._validar_parametros(id_experimento, id_proyecto)

        modelo = ProyectoExperimento(proyecto=Proyecto.objects.get(pk=id_proyecto),
                                     experimento=Experimento.objects.get(pk=id_experimento),
                                     contenido="{}")
        return LaboratorioBaseView.guardar_y_agregar_id_contenido_json(modelo, request)

    def put(self, request, id_proyecto=None, id_experimento=None, *args, **kwargs):
        """
        Actualiza el progreso de un experimento de un proyecto
        :param id_proyecto: requerido
        :param id_experimento: requerido
        """
        self._validar_parametros(id_experimento, id_proyecto)
        mapa_json = LaboratorioBaseView.contenido_json_a_mapa_con_id(request.body)
        modelo = ProyectoExperimento.objects.get(pk=mapa_json['id'],
                                                 proyecto__id=id_proyecto,
                                                 experimento__id=id_experimento)
        modelo.contenido = request.body
        modelo.save()
        return HttpResponse(modelo.contenido, content_type="application/json")

    @staticmethod
    def _validar_parametros(id_experimento, id_proyecto):
        if id_proyecto is None or id_experimento is None:
            raise LaboratorioException("Se requiere id_proyecto y id_experimento")
