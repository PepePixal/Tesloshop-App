/* cliente HTTP o servicio de API */

import axios from 'axios';

//Crea una instancia personalizada de Axios, para realizar peticiones HTTP
const tesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// * Interceptores: *//
// Funciones que Axios ejecuta antes de enviar una petición o al recibir una respuesta,
// muy útiles para añadir tokens de autenticación en las cabeceras o manejar errores globales

// interceptor para enviar una una Authorization type Bearer Token, 
// en la cabecera de la petición (request) http, si existe el token
tesloApi.interceptors.request.use( (config) => {
    
    //obtiene el token del localStorage
    const token = localStorage.getItem('token');
    // si existe token, lo agrega al header de la petición http, como Authorization type Bearer Token
    if ( token ) {
        config.headers.Authorization = `Bearer ${ token }`;
    }

    return config;
});


// Exporta la instancia para que pueda ser importada y
// utilizada en cualquier otro archivo del proyecto
export { tesloApi };