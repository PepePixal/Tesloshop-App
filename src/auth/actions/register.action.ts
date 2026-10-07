/*
función asíncrona para gestionar el registro de un nuevo usuario 
mediante una API.
*/

import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";


// func asinc. recibe email, password y fullName, hace petición http post con un instancia de Axios,
// enviando la url y la data para el body de la petición.
// Promete devolver estructura de datos tipo AuthResponse, a data.
export const registerAction = async( email: string, password: string, fullName: string ):Promise<AuthResponse> => {

    try {
        // petición http post con instancia de Axios (tesloApi), enviando url del endpoint y body, 
        // y espera algo tipo <AuthResponse> como respuesta.
        const { data } = await tesloApi.post<AuthResponse>(
            '/auth/register',
            {
                email: email,           //simplificable con email,
                password: password,     //sinplificable con passsword,
                fullName: fullName,     //sinplificable con fullName,
            }
        );

        // console.log(data);

        return data;

        
    } catch (error) {
        console.log({error});
        // Vuelve a lanzar el error capturado, hacia arriba,
        // propagándolo al componente o función que llamó a la función loginAction.
        throw error;
    }

};