from selenium.webdriver.common.by import By

__author__ = 'asistente'

from unittest import TestCase
from selenium import webdriver

class FuncionalTest(TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(2)

    def tearDown(self):
        self.browser.quit()

    def test_title(self):
        self.browser.get("http://localhost:8000")
        self.assertIn("Busco ayuda", self.browser.title)

    def test_registrar(self):
        self.browser.get('http://localhost:8000')

        link = self.browser.find_element_by_id('id_register')
        link.click()

        nombre = self.browser.find_element_by_id('id_nombre')
        nombre.send_keys('Juan Daniel')

        apellidos = self.browser.find_element_by_id('id_apellidos')
        apellidos.send_keys('Arevalo')

        experiencia = self.browser.find_element_by_id('id_aniosExperiencia')
        experiencia.send_keys('5')

        self.browser.find_element_by_xpath("//select[@id='id_tiposDeServicio']/option[text()='Desarrollador Web']").click()
        telefono = self.browser.find_element_by_id('id_telefono')
        telefono.send_keys('3173024578')

        correo = self.browser.find_element_by_id('id_correo')
        correo.send_keys('jd.patino1@uniandes.edu.co')

        nombreUsuario = self.browser.find_element_by_id('id_username')
        nombreUsuario.send_keys('juan645')

        clave = self.browser.find_element_by_id('id_password')
        clave.send_keys('clave123')

        botonGrabar = self.browser.find_element_by_id('id_grabar')
        botonGrabar.click()
        self.browser.implicitly_wait(3)
        span = self.browser.find_element(By.XPATH, '//span[text()="Juan Daniel Arevalo"]')

        self.assertIn('Juan Daniel Arevalo', span.text)

    def test_verDetalle(self):
        self.browser.get('http://localhost:8000')
        span = self.browser.find_element(By.XPATH, '//span[text()="Juan Daniel Arevalo"]')
        span.click()
        h2 = self.browser.find_element(By.XPATH, '//h2[text()="Juan Daniel Arevalo"]')
        self.assertIn('Juan Daniel Arevalo', h2.text)


    def test_loguearse(self):
        self.browser.get('http://localhost:8000')
        link = self.browser.find_element_by_id('id_login')
        link.click()
        modal = self.browser.find_element_by_id('login_modal')

        nombreUsuario = modal.find_element_by_id('id_username')
        nombreUsuario.send_keys('juan645')

        clave = modal.find_element_by_id('id_password')
        clave.send_keys('clave123')
        botonGrabar = modal.find_element_by_id('id_ingresar')
        botonGrabar.click()


    def test_editar_independiente(self):
        self.browser.get('http://localhost:8000')
        link = self.browser.find_element_by_id('id_login')
        link.click()
        modal = self.browser.find_element_by_id('login_modal')

        nombreUsuario = modal.find_element_by_id('id_username')
        nombreUsuario.send_keys('juan645')

        clave = modal.find_element_by_id('id_password')
        clave.send_keys('clave123')
        botonGrabar = modal.find_element_by_id('id_ingresar')
        botonGrabar.click()

        close = self.browser.find_element_by_class_name('close')
        close.click()

        botonEditar = self.browser.find_element_by_id('id_editar')
        botonEditar.click()

        form = self.browser.find_element_by_id('editar-form')

        nombre = form.find_element_by_id('id_nombre')
        nombre.clear()
        nombre.send_keys('Juan Daniel Editadpo')

        apellidos = form.find_element_by_id('id_apellidos')
        apellidos.clear()
        apellidos.send_keys('Arevalo')

        experiencia = form.find_element_by_id('id_aniosExperiencia')
        experiencia.clear()
        experiencia.send_keys('5')

        telefono = form.find_element_by_id('id_telefono')
        telefono.clear()
        telefono.send_keys('3173024578')

        correo = form.find_element_by_id('id_correo')
        correo.clear()
        correo.send_keys('jd.patino1@uniandes.edu.co')

        botonGrabar = form.find_element_by_id('id_grabar')
        botonGrabar.click()

    def test_comentar(self):
        self.browser.get('http://localhost:8000')

        trabajador = self.browser.find_element_by_class_name('trabajador')
        trabajador.click()

        close = self.browser.find_element_by_id('correo')
        close.send_keys("comentario")
        close = self.browser.find_element_by_id('comentario')
        close.send_keys("comentario")