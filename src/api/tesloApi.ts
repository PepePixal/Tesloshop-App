/* cliente HTTP o servicio de API */

import axios from 'axios';

//Crea una instancia personalizada de Axios, para realizar peticiones HTTP
const tesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// TODO interceptores
// interceptores: funciones que Axios ejecuta antes de enviar una petición o al recibir una respuesta, muy útiles para añadir tokens de autenticación en las cabeceras o manejar errores globales

// Exporta la instancia para que pueda ser importada y
// utilizada en cualquier otro archivo del proyecto
export { tesloApi };