/* action que verifica si el usuario tiene una sesión activa válida en el navegador,
 comprobando si hay token en el localStorage y es válido */

import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";


// la func devolvera una Promesa que resuelve un objeto tipo <AuthResponse>
export const checkAuthAction = async ():Promise<AuthResponse> => {

    // obtiene el token del localStorage
    const token = localStorage.getItem('token');
    // si no existe token, se para la func y lanza new Error
    if( !token ) throw new Error('No token found');

    // si existe token, comprobar que es válido y no ha expirado
    try {
        //petición http get con instancia de Axios al endpoint /check-status,
        //el interceptor de tesloApi enviará el token en el header como Authorization type Bearer Token
        //Espera una respuesta de tipo <AuthResponse>
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        // asigna el nuevo token recibido en data, al localStorage
        localStorage.setItem('token', data.token);

        return data;
        
    } catch (error) {
        console.log(error);
        // si la petición devuelve error, eliminar el token inválido
        localStorage.removeItem('token');
        // Lanza un nuevo error hacia el componente o función superior que invocó a checkAuthAction
        throw new Error('Token expired or not valid');
    }

};