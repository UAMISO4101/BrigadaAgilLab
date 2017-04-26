# coding=utf-8

from django.core import serializers
from ..models import ExperimentoAsistente, Usuario
from ..views import ContenidoJsonBaseView
from django.http import HttpResponse


class UsuarioView(ContenidoJsonBaseView):
    def __init__(self):
        self.model = Usuario


    def get(self, request, *args, **kwargs):

        contenido_modelo = self.model.objects.all()
        data = serializers.serialize('json', contenido_modelo)
        #usuario = Usuario[]

        return HttpResponse(data, content_type="application/json")

    def put(self, request, id_proyecto=None, id_experimento=None, id_usuario=None, *args, **kwargs):
        """
        Actualiza la informacion entre un experimento y un usuario
        :param id_experimento: requerido
        :param id_usuario: requerido
        """
        #self._validar_parametros(id_experimento, id_usuario)
        #self._validar_relaciones(id_experimento, id_usuario)

        mapa_json = LaboratorioBaseView.contenido_json_a_mapa_con_id(request.body)
        modelo = ExperimentoAsistente.objects.get(pk=mapa_json['id'],
                                                                experimento__id=id_experimento,
                                                                usuario__id=id_usuario)
        modelo.contenido = request.body
        modelo.save()
        return HttpResponse(modelo.contenido, content_type="application/json")

