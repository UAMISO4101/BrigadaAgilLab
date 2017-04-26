"""proyecto_laboratorio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url

from views import ProyectoExperimentoView, ExperimentoView, ProtocoloView, \
    ProyectoView, ExperimentoProtocoloView, ProtocolosExperimentosProyectoView, UsuarioView


urlpatterns = [
    url(r'^proyecto/$', ProyectoView.as_view()),
    url(r'^proyecto/(?P<id>\d+)/$', ProyectoView().get_por_id),
    # Proyecto - Experimentos - get
    url(r'^proyecto/(?P<id_proyecto>\d+)/experimento/$', ProyectoExperimentoView.as_view()),
    # Proyecto - Experimentos - post+put
    url(r'^proyecto/(?P<id_proyecto>\d+)/experimento/(?P<id_experimento>\d+)/$', ProyectoExperimentoView.as_view()),
    # Proyecto - Experimento - Protocolos - get
    url(r'^proyecto/(?P<id_proyecto>\d+)/experimento/(?P<id_experimento>\d+)/protocolo/$',
        ProtocolosExperimentosProyectoView.as_view()),
    # Proyecto - Experimento - Protocolos - post+put
    url(r'^proyecto/(?P<id_proyecto>\d+)/experimento/(?P<id_experimento>\d+)/protocolo/(?P<id_protocolo>\d+)/$',
        ProtocolosExperimentosProyectoView.as_view()),
    # Proyecto - Experimento - Protocolos - post+put
    url(r'^proyecto/(?P<id_proyecto>\d+)/protocolos/filtro/(?P<nombre>.+)/$',
        ProtocolosExperimentosProyectoView.as_view()),

    url(r'^experimento/$', ExperimentoView.as_view()),
    url(r'^experimento/(?P<id>\d+)/$', ExperimentoView().get_por_id),
    # Experimento - protocolo - get
    url(r'^experimento/(?P<id_experimento>\d+)/protocolo/$', ExperimentoProtocoloView.as_view()),
    # Experimento - protocolo - post+put
    url(r'^experimento/(?P<id_experimento>\d+)/protocolo/(?P<id_protocolo>\d+)$', ExperimentoProtocoloView.as_view()),

    # Listar todos los protocolos
    url(r'^protocolo/$', ProtocoloView.as_view()),
    #Buscar protocolo que coincida por el id
    url(r'^protocolo/(?P<id>\d+)/$', ProtocoloView().get_por_id),
    #Buscar protocolos que contengan en el nombre en una determinado proyecto
    url(r'^protocolo/filtro/(?P<id_experimento>\d+)/(?P<nombre>.+)/$', ProtocoloView().buscar_en_experimento_por_nombre),
    #Buscar protocolos que contengan en nombre
    url(r'^protocolo/filtro/(?P<nombre>.+)/$', ProtocoloView().get_por_nombre),
    url(r'^proyecto/autocomplete/(?P<nombre>.+)/$', ProyectoView().get_por_name, name='proyecto_name'),

    url(r'^usuario/$', UsuarioView().get),
]
