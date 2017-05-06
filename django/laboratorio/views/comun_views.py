# coding=utf-8
import json

from django.http import HttpResponse
from django.http import HttpResponseServerError
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt


class LaboratorioException(Exception):
    def __init__(self, message):
        self.message = message


class LaboratorioBaseView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        try:
            return super(LaboratorioBaseView, self).dispatch(request, *args, **kwargs)
        except LaboratorioException as e:
            return HttpResponseServerError("<h1>" + e.message + "</h1>")

    @staticmethod
    def guardar_y_agregar_id_contenido_json(instancia_modelo, request):
        instancia_modelo.save()
        json_as_mapa = json.loads(LaboratorioBaseView.contenido_json_valido(request.body))
        json_as_mapa['id'] = instancia_modelo.id
        instancia_modelo.contenido = json.dumps(json_as_mapa)
        instancia_modelo.save()
        return HttpResponse(instancia_modelo.contenido, content_type="application/json")

    @staticmethod
    def contenido_json_a_mapa_con_id(contenido_json):
        mapa_body = json.loads(LaboratorioBaseView.contenido_json_valido(contenido_json))
        if 'id' not in mapa_body:
            raise LaboratorioException('Se requiere un JSON con el atributo id: {"id":"..." ...}')
        return mapa_body

    @staticmethod
    def contenido_json_valido(contenido_json):
        """
        valida que el string sea un JSON valido, si es un JSON mal formado genera una excepcion
         si es vacio retorna un string representando un objeto vacio
        :param contenido_json: string que representa un JSON
        :return: contenido_json o objeto vacio "{}"
        """
        if contenido_json:
            try:
                json.loads(contenido_json)
                return contenido_json
            except:
                raise LaboratorioException("JSON Invalido: " + contenido_json)
        else:
            return "{}"


class ContenidoJsonBaseView(LaboratorioBaseView):
    model = None

    def get(self, request, *args, **kwargs):
        """
        Entrega el contenido JSON (informacion basica) del modelo asociado
        """
        contenido_modelo = self.model.objects.values('contenido')
        lista = map(lambda x: json.loads(x["contenido"]), contenido_modelo)
        return HttpResponse(json.dumps(lista), content_type="application/json")

    def post(self, request, *args, **kwargs):
        """
        Permite inicializar un modelo con contenido JSON, lo crea en la bd
        y luego le asigna el atributo id de la pk generada
        """
        LaboratorioBaseView.contenido_json_valido(request.body)
        self.pre_validar_creacion(request, *args, **kwargs)
        modelo = self.model(contenido="{}")
        return LaboratorioBaseView.guardar_y_agregar_id_contenido_json(modelo, request)

    def put(self, request, *args, **kwargs):
        """
        Actualiza el contenido JSON de un modelo, requiere que el body contenga el atributo id
        del modelo a actualizar
        """
        mapa_json = LaboratorioBaseView.contenido_json_a_mapa_con_id(request.body)
        modelo = self.model.objects.get(pk=mapa_json['id'])
        modelo.contenido = request.body
        modelo.save()
        return HttpResponse(modelo.contenido, content_type="application/json")

    def get_por_id(self, request, id=None):
        modelo = self.model.objects.get(pk=id)
        return HttpResponse(modelo.contenido, content_type="application/json")

    def get_por_nombre(self, request, nombre=None):
        contenido_modelo = self.model.objects.filter(contenido__contains=nombre)[:5].values('contenido')
        lista = map(lambda x: json.loads(x["contenido"]), contenido_modelo)
        return HttpResponse(json.dumps(lista), content_type="application/json")

    def get_por_name(self, request, nombre=None):
        contenido_modelo = self.model.objects.values('contenido')
        lista = map(lambda x: json.loads(x["contenido"]), contenido_modelo)
        return HttpResponse(json.dumps(lista), content_type="application/json")

    def pre_validar_creacion(self, request, *args, **kwargs):
        pass

    def pre_validar_actualizacion(self, request, *args, **kwargs):
        pass
