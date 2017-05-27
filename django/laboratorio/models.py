from __future__ import unicode_literals

from django.contrib.auth.models import Group, User
from django.db import models


class Perfil(Group):
    descripcion = models.TextField(blank=True)
    objects = models.Manager()

    class Meta:
        verbose_name_plural = "Perfiles"
        ordering = ['name']

    def __unicode__(self):
        return u'%s' % (self.name)


class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    perfil = models.OneToOneField(Perfil, on_delete=models.CASCADE)

    def __unicode__(self):
        return u'%s' % (self.nombre)


class Insumo(models.Model):
    nombre = models.CharField(max_length=50)
    Unidad_Medida = (
        ("mg", "Miligramo"),
        ("gr", "Gramo"),
        ("Kg", "Kilogramo"),
        ("ml", "Mililitro"),
        ("Lt", "Litro"),
    )
    unidad = models.CharField(max_length=2, choices=Unidad_Medida)
    contenido = models.TextField()


class Contenedor(models.Model):
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.nombre

class Herramienta(models.Model):
    contenido = models.CharField(max_length=50)


class Inventario(models.Model):
    insumo = models.ForeignKey(Insumo)
    contenedor = models.ForeignKey(Contenedor)
    cantidad = models.DecimalField(max_digits=10, decimal_places=4, default=0)


class Proveedor(models.Model):
    name = models.CharField(max_length=50)
    nit = models.DecimalField(max_digits=10, decimal_places=0, default=0)


class Pedido(models.Model):
    fecha = models.DateField()
    # Choices
    estado_type = (
        ("G", "Generada"),
        ("P", "Proceso"),
        ("T", "Terminada"),
        ("C", "Cancelada")
    )
    estado = models.CharField(max_length=1, choices=estado_type)
    cantidad = models.DecimalField(max_digits=10, decimal_places=4, default=0)
    insumo = models.ForeignKey(Insumo)


# ---- Modelos basados en JSON

class Proyecto(models.Model):
    # almacena contenido basico del proyecto, sin relaciones a otros modelos
    contenido = models.TextField()


class Experimento(models.Model):
    # almacena contenido basico del experimiento, sin relaciones a otros modelos
    contenido = models.TextField()


class ProyectoExperimento(models.Model):
    # Relaciona los experimentos de un proyecto
    proyecto = models.ForeignKey(Proyecto)
    experimento = models.ForeignKey(Experimento)
    # Almacena el avance del experimento en el proyecto
    contenido = models.TextField()

    class Meta:
        unique_together = ('proyecto', 'experimento')


class Protocolo(models.Model):
    # almacena contenido basico del protocolo,
    # informacion que no cambia entre versiones
    # sin relaciones a otros modelos
    contenido = models.TextField()


class VersionProtocolo(models.Model):
    protocolo = models.ForeignKey(Protocolo)
    # almacena la informacion que debe ser versionada del protocolo
    contenido = models.TextField()


class ExperimentoProtocolo(models.Model):
    # Permite establecer la plantilla de los protocolos de un experimento
    experimento = models.ForeignKey(Experimento)
    protocolo = models.ForeignKey(Protocolo)
    # No usado
    contenido = models.TextField()

    class Meta:
        unique_together = ('experimento', 'protocolo')


class AvanceProtocoloExperimentoProyecto(models.Model):
    proyecto = models.ForeignKey(Proyecto)
    experimento = models.ForeignKey(Experimento)
    protocolo = models.ForeignKey(Protocolo)
    # Almacena el avance del protocolo asociado a un experimento de un proyecto
    contenido = models.TextField()


class ExperimentoAsistente(models.Model):
    # Permite establecer la plantilla de los protocolos de un experimento
    experimento = models.ForeignKey(Experimento)
    asistente = models.ForeignKey(Usuario)
    # No usado
    contenido = models.TextField()

    class Meta:
        unique_together = ('experimento', 'asistente')

class ProtocoloInsumo(models.Model):
    insumo = models.ForeignKey(Insumo)
    protocolo = models.ForeignKey(Protocolo)
    contenido = models.TextField()

class ProtocoloHerramienta(models.Model):
    herramienta = models.ForeignKey(Herramienta)
    protocolo = models.ForeignKey(Protocolo)
    contenido = models.TextField()
