import json

from django.db import transaction
from django.http import HttpResponse

from laboratorio.models import Protocolo, VersionProtocolo
from laboratorio.views import ContenidoJsonBaseView, LaboratorioException, EMPTY_JSON, LaboratorioBaseView


class ProtocoloVersionView(ContenidoJsonBaseView):
    def __init__(self):
        self.model = Protocolo

    def pre_validar_creacion(self, request, *args, **kwargs):
        map = json.loads(request.body)
        identificador_ = map['identificador']
        count = Protocolo.objects.filter(contenido__contains='"identificador": "' + identificador_ + '"').count()
        if count > 0:
            raise LaboratorioException(
                "El Protocolo con Identificador " + identificador_ + " ya existe en el Laboratorio")

    def guardar_version(self, protocolo):
        version = VersionProtocolo(protocolo=protocolo, contenido=EMPTY_JSON)
        version.save()
        json_as_mapa = json.loads(protocolo.contenido)
        json_as_mapa['id_version'] = version.id
        version.contenido = json.dumps(json_as_mapa)
        version.save()
        return version

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        """
        Crear Protocolo
        """
        super(ProtocoloVersionView, self).post(request, args, kwargs)
        map_ = json.loads(request.body)
        identificador_ = map_['identificador']
        protocolo = Protocolo.objects.filter(contenido__contains='"identificador": "' + identificador_ + '"').first()

        version = self.guardar_version(protocolo)
        return HttpResponse(version.contenido, content_type="application/json")

    @transaction.atomic
    def put(self, request, *args, **kwargs):
        mapa_json = LaboratorioBaseView.contenido_json_a_mapa_con_id(request.body)
        protocolo = self.model.objects.get(pk=mapa_json['id'])

        mapa_previo = LaboratorioBaseView.contenido_json_a_mapa_con_id(protocolo.contenido)

        mapa_json["version"] = str(int(mapa_previo["version"]) + 1)

        protocolo.contenido = json.dumps(mapa_json)
        protocolo.save()

        self.guardar_version(protocolo)

        return HttpResponse(protocolo.contenido, content_type="application/json")

    def ultimas_dos_versiones(self, request, id=None):
        protocolo = self.model.objects.get(pk=id)
        res = VersionProtocolo.objects.filter(protocolo_id=id).order_by("-id")
        count = res.count()
        reciente = protocolo.contenido
        versionada = protocolo.contenido
        if count > 1:
            versionada = res[1].contenido

        return HttpResponse('[' + versionada + ',' + reciente + ']', content_type="application/json")

    def versiones(self, request, id=None, v1=None, v2=None):
        self._validar_parametros_versiones(id, v1, v2)
        res_v1 = VersionProtocolo.objects.filter(protocolo_id=id, contenido__contains='"version": "' + v1 + '"')
        res_v2 = VersionProtocolo.objects.filter(protocolo_id=id, contenido__contains='"version": "' + v2 + '"')

        protocolo_v1 = EMPTY_JSON
        protocolo_v2 = EMPTY_JSON

        if res_v1.count() > 0:
            protocolo_v1 = res_v1.first().contenido

        if res_v2.count() > 0:
            protocolo_v2 = res_v2.first().contenido

        return HttpResponse('[' + protocolo_v1 + ',' + protocolo_v2 + ']', content_type="application/json")

    @staticmethod
    def _validar_parametros_versiones(id, v1, v2):
        if id is None or v1 is None or v2 is None:
            raise LaboratorioException("Se requiere id protocolo y dos versiones")
