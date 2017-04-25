# coding=utf-8

from django.core import serializers
from ..models import Usuario
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

