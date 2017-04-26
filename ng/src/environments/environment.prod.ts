export const environment = {
    production: true,
    url_servicios: function () {
        try {
            return process.env.URL_SERVICIOS;
        } catch (Exception) {
            return 'http://127.0.0.1:8000/servicios/';
        }
    }
};
