# coding=utf-8
import json

from django.core.exceptions import ObjectDoesNotExist

from laboratorio.models import Protocolo, AvanceProtocoloExperimentoProyecto, ProyectoExperimento, ExperimentoProtocolo
from laboratorio.views import ContenidoJsonBaseView, LaboratorioBaseView, HttpResponse, LaboratorioException


class ProtocoloView(ContenidoJsonBaseView):
    def __init__(self):
        self.model = Protocolo

    def buscar_en_experimento_por_nombre(self, request, id_experimento=None, nombre=None):
        """
        Entrega la informacion basica de los protocolos de un experimento con su avance para el proyecto
        :param id_proyecto:
        :param nombre:
        """
        print"buscar_en_experimento_por_nombre"
        contenido_modelo = ExperimentoProtocolo.objects.filter(experimento__id=id_experimento).values(
            "protocolo__contenido")
        lista = map(lambda x: json.loads(x["protocolo__contenido"]), contenido_modelo)
        return HttpResponse(json.dumps(lista), content_type="application/json")


class ProtocolosExperimentosProyectoView(LaboratorioBaseView):
    def get(self, request, id_proyecto=None, id_experimento=None, *args, **kwargs):
        """
        Entrega la informacion basica de los protocolos de un experimento con su avance para el proyecto
        :param id_proyecto:
        :param id_experimento:
        """
        contenido_modelo = AvanceProtocoloExperimentoProyecto.objects.filter(proyecto__id=id_proyecto,
                                                                             experimento__id=id_experimento).values(
            "protocolo__contenido",
            "contenido")
        lista = map(
            lambda elem:
            {
                'protocolo': json.loads(elem["protocolo__contenido"]),
                'progreso': json.loads(elem["contenido"]
                                       )},
            contenido_modelo)
        return HttpResponse(json.dumps(lista), content_type="application/json")

    def post(self, request, id_proyecto=None, id_experimento=None, id_protocolo=None, *args, **kwargs):
        """
        Crea la informacion de avance de ejecucion de un protocolo de un experimento en un proyecto
        :param id_proyecto: requerido
        :param id_experimento: requerido
        :param id_protocolo: requerido
        """
        self._validar_parametros(id_proyecto, id_experimento, id_protocolo)
        self._validar_relaciones(id_proyecto, id_experimento, id_protocolo)

        modelo = AvanceProtocoloExperimentoProyecto(proyecto_id=id_proyecto,
                                                    experimento_id=id_experimento,
                                                    protocolo_id=id_protocolo,
                                                    contenido="{}")
        return LaboratorioBaseView.guardar_y_agregar_id_contenido_json(modelo, request)

    def put(self, request, id_proyecto=None, id_experimento=None, id_protocolo=None, *args, **kwargs):
        """
        Actualiza la informacion entre un experimento y un protocolo
        :param id_proyecto: requerido
        :param id_experimento: requerido
        :param id_protocolo: requerido
        """
        self._validar_parametros(id_proyecto, id_experimento, id_protocolo)
        self._validar_relaciones(id_proyecto, id_experimento, id_protocolo)

        mapa_json = LaboratorioBaseView.contenido_json_a_mapa_con_id(request.body)
        modelo = AvanceProtocoloExperimentoProyecto.objects.get(pk=mapa_json['id'],
                                                                proyecto_id=id_proyecto,
                                                                experimento__id=id_experimento,
                                                                protocolo__id=id_protocolo)
        modelo.contenido = request.body
        modelo.save()
        return HttpResponse(modelo.contenido, content_type="application/json")

    @staticmethod
    def _validar_parametros(id_proyecto, id_experimento, id_protocolo):
        if id_proyecto is None or id_experimento is None or id_protocolo is None:
            raise LaboratorioException("Se requiere id_proyecto, id_experimento y id_protocolo")

    @staticmethod
    def _validar_relaciones(id_proyecto, id_experimento, id_protocolo):
        try:
            # verificar que la relacion proyecto - experimento existe
            ProyectoExperimento.objects.get(proyecto__id=id_proyecto, experimento__id=id_experimento)
        except ObjectDoesNotExist:
            raise LaboratorioException(
                "La relacion proyecto: {} - experimento: {} no existe".format(id_proyecto, id_experimento))
        try:
            # verificar que la relacion experimento - protocolo existe
            ExperimentoProtocolo.objects.get(experimento__id=id_experimento, protocolo__id=id_protocolo)
        except ObjectDoesNotExist:
            raise LaboratorioException(
                "La relacion experimento: {} - protocolo: {} no existe".format(id_proyecto, id_experimento))
