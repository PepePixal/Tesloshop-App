/*
Este código define componentes de orden superior o de protección de rutas (Route Guards / Wrapper Components)
 desarrollados en React (utilizando TypeScript y Zustand para la gestión del estado).
Su función principal es actuar como un filtro o guardia de seguridad antes de permitir
 que un usuario acceda a determinadas páginas o vistas de una aplicación web.
*/

import { useAuthStore } from "@/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

// recibe en children, un componente de renderizado del enrutador, no lo modifica,
// y solo lo retorna si el ususrio esta autenticado y ha iniciado la sesión
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {

    // obtienen el authStatus de useAuthSotre() de Zustand
    const { authStatus } = useAuthStore();

    // si el authStatus todavía se esta comprobando, retorna null
    if( authStatus === 'checking' ) return null;
    // si el user no está autenticado, lo redirige al login
    if( authStatus === 'not-authenticated' ) return <Navigate to='/auth/login' />;

    // si esta autenticado retorna el componente a renderizar, recibido en children
    return children;

};


// recibe en children, un componente de renderizado del enrutador, no lo modifica,
// y solo lo retorna si el ususrio tiene privilegios (rol) de "Administrador"
export const AdminRoute = ({ children }: PropsWithChildren) => {
    // obtienen el authStatus de useAuthSotre() de Zustand
    const { authStatus, isAdmin } = useAuthStore();

    // si el authStatus todavía se esta comprobando, retorna null
    if( authStatus === 'checking' ) return null;
    // si el user no está autenticado, lo redirige al login
    if( authStatus === 'not-authenticated' ) return <Navigate to='/auth/login' />;

    // si el user no tiene el rol de Administrador, lo redirige al home 
    if( !isAdmin() ) return <Navigate to='/' />;

    // si el user esta autenticado y es Admin retorna el componente a renderizar, recibido en children
    return children;

};


// recibe en children, un componente de renderizado del enrutador, no lo modifica,
// solo lo retorna si el ususrio No esta autenticado,
// evitando que un usuario que ya ha iniciado sesión, vuelva a entrar a páginas como el login o el registro.
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {

    // obtienen el authStatus de useAuthSotre() de Zustand
    const { authStatus } = useAuthStore();

    // si el authStatus todavía se esta comprobando, retorna null
    if( authStatus === 'checking' ) return null;
    // si el user está autenticado, lo redirige al home
    if( authStatus === 'authenticated' ) return <Navigate to='/' />;

    // si esta autenticado retorna el componente a renderizar, recibido en children
    return children;

};