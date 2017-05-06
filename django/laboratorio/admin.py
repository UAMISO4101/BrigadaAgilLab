from django.contrib import admin
from django.contrib.auth.models import User, Group

from .models import Experimento, Protocolo, ProyectoExperimento, VersionProtocolo, ExperimentoProtocolo, \
    AvanceProtocoloExperimentoProyecto, ExperimentoAsistente
from .models import Perfil, Usuario, Proyecto, Insumo, Herramienta

admin.site.register(Perfil)
admin.site.register(Usuario)
admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.register(Insumo)
admin.site.register(Herramienta)
admin.site.register(Proyecto)
admin.site.register(Experimento)
admin.site.register(Protocolo)
admin.site.register(ProyectoExperimento)
admin.site.register(VersionProtocolo)
admin.site.register(ExperimentoProtocolo)
admin.site.register(AvanceProtocoloExperimentoProyecto)
admin.site.register(ExperimentoAsistente)
