# coding=utf-8
import json

from django.http import HttpResponse

from laboratorio.views import LaboratorioException
from ..models import Insumo
from ..views import ContenidoJsonBaseView, LaboratorioBaseView


class InsumoView(ContenidoJsonBaseView):
    def __init__(self):
        self.model = Insumo
