import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response";


//func asinc. recibe email y password, hace petición http post con un instancia de Axios,
// enviando la url y la data para el body de lapetición y retorna la data.
// La función promete devolver estructura de datos tipo AuthResponse.
export const loginAction = async( email: string, password: string ):Promise<AuthResponse> => {

    try {
        // petición http post con instancia de Axios (tesloApi), enviando url del endpoint y body, 
        // y espera algo tipo <AuthResponse> como respuesta. 
        const { data } = await tesloApi.post<AuthResponse>(
            '/auth/login',
            {
                email: email,           //simplificable con email,
                password: password,     //sinplificable con passsword,
            }
        );

        console.log(data);

        return data;

    } catch (error) {
        console.log(error);
        // Vuelve a lanzar el error capturado, hacia arriba,
        // propagándolo al componente o función que llamó a la función loginAction.
        throw error;
    }
};