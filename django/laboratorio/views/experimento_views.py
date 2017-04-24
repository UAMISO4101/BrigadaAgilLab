# coding=utf-8
import json

from django.core import serializers

from ..models import Experimento, ExperimentoProtocolo, Usuario
from ..views import ContenidoJsonBaseView, LaboratorioBaseView, LaboratorioException, HttpResponse
from django.http import HttpResponse


class ExperimentoView(ContenidoJsonBaseView):
    def __init__(self):
        self.model = Experimento


class ExperimentoProtocoloView(LaboratorioBaseView):

    def get(self, request, id_experimento=None, *args, **kwargs):
        """
        Entrega la informacion de los protocolos de un experimento
        :param id_experimento:
        """
        contenido_modelo = ExperimentoProtocolo.objects.filter(experimento__id=id_experimento).values(
            "protocolo__contenido", "contenido")
        lista = map(
            lambda elem: {
                'protocolo': json.loads(elem["protocolo__contenido"]),
                'relacion': json.loads(elem["contenido"])
            },
            contenido_modelo)
        return HttpResponse(json.dumps(lista), content_type="application/json")

    def post(self, request, id_experimento=None, id_protocolo=None, *args, **kwargs):
        """
        Crea la relacion entre un protocolo y un experimento y almacena el contenido del progreso
        :param id_experimento: requerido
        :param id_protocolo: requerido
        """
        self._validar_parametros(id_experimento, id_protocolo)

        modelo = ExperimentoProtocolo(experimento_id=id_experimento,
                                      protocolo_id=id_protocolo,
                                      contenido="{}")
        return LaboratorioBaseView.guardar_y_agregar_id_contenido_json(modelo, request)

    def put(self, request, id_experimento=None, id_protocolo=None, *args, **kwargs):
        """
        Actualiza la informacion entre un experimento y un protocolo
        :param id_experimento: requerido
        :param id_protocolo: requerido
        """
        self._validar_parametros(id_experimento, id_protocolo)
        mapa_json = LaboratorioBaseView.contenido_json_a_mapa_con_id(request.body)
        modelo = ExperimentoProtocolo.objects.get(pk=mapa_json['id'],
                                                  experimento__id=id_experimento,
                                                  protocolo__id=id_protocolo)
        modelo.contenido = request.body
        modelo.save()
        return HttpResponse(modelo.contenido, content_type="application/json")

    @staticmethod
    def _validar_parametros(id_experimento, id_protocolo):
        if id_experimento is None or id_protocolo is None:
            raise LaboratorioException("Se requiere id_experimento y id_protocolo")
