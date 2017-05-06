# coding=utf-8
import json

from django.http import HttpResponse

from ..models import Herramienta
from ..views import ContenidoJsonBaseView, LaboratorioBaseView


class HerramientaView(ContenidoJsonBaseView):
    def __init__(self):
        self.model = Herramienta
