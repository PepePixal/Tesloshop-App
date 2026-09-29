/* gestor de estado del auth del usuario,
 con el gestor de estado de terceros, zustand */

import { create } from 'zustand'
import type { User } from '@/interfaces/user.interface'
import { loginAction } from '../actions/login.action';

// uso de type para el tipado, recomendado pro zustand
type AuthState = {
    // Properties:
    user: User | null,      //el valor puede ser null
    token: string | null,   //el valor puede ser null
    // Getters:
    // Actions:
    login: (email: string, password: string) => Promise<boolean>;
};

// define el store
export const useAuthStore = create<AuthState>()((set) => ({
    // Implementación del Store
    user: null,
    token: null, 

    // Actions
    login: async(email: string, password: string) => {
        console.log({email, password});

        try {
            // llama func loginAction() enviando paráms, que hace la petición http post al endpoint de la api
            const data = await loginAction( email, password);
            // almacena el valor de la prop token del obj data, en el localStorage con key 'token'
            localStorage.setItem('token', data.token);
            // graba la información en el estado y detona el rerender de React
            set({ user: data.user, token: data.token });
            // como todo ha salido bien
            return true;

        } catch (error) {
            // si la llamada sale mal,
            // elimina el token del localStorage (por precaución)
            localStorage.removeItem('token'); 
            //asigna null al estado
            set({ user: null, token: null });
            // como ha salido mal
            return false;
        }
    }
}));

