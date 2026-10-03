/*
Componente raíz que actúa como el contenedor principal de la aplicación,
envolviendo todo lo demás con los contextos necesarios para que las páginas funcionen
y puedan comunicarse con APIs de forma eficiente.
*/

// componente RouterProvider para gestionar el sistema de enrutamiento basado en la librería react-router.
import { RouterProvider } from "react-router"
// configuración de rutas personalizada definida en el archivo local app.router.
import { appRouter } from "./app.router"
// tipo de TypeScript que facilita tipificar componentes que aceptan elementos hijos (children).
import type { PropsWithChildren } from "react";
// herramientas de la librería Tanstack React query,
// para manejar peticiones, caché y sincronización de datos con servidores.
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
// librería de utilidades para desarrollo
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// cpmponente para renderizar mensajes en pantalla, de la librería Sonner
import { Toaster } from 'sonner';
//acción asíncrona encargada de verificar si el usuario cuenta con una sesión activa.
import { checkAuthAction } from "./auth/actions/check-auth.action";
//componente visual personalizado para mostrar una pantalla de carga completa.
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";

// Crea la instancia global del cliente de consultas.
// Este objeto se encarga de administrar la caché de todas las peticiones HTTP que haga tu aplicación.
const queryClient = new QueryClient();

// Se Declara un componente funcional personalizado,
// que recibe elemento hijo, tipificado mediante TypeScript ( <RouterProvider router={appRouter} />)
// y lo retorna sin tocar, una vez comprobado el estado de la autenticación del usuario.
const CheckAuthProvider = ({ children }: PropsWithChildren ) => {

  //hook useQuery de React Query, para saber si la petición está en curso.
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthAction,
    //no reintentar si falla la petición
    retry: false,
    //opcional - reenviar la petición cada hora y media, para revalidar el token
    refetchInterval: 1000 * 60 * 60 *1.5,
    //opcional - recuperar el foco
    refetchOnWindowFocus: true,
  });

  // si la verificación de la autenticación está cargando, renderiza el spiner (Cargando...)
  if (isLoading) return <CustomFullScreenLoading />;

  // cuando la carga termina, 
  // renderiza y devuelve con normalidad los componentes hijos contenidos dentro del proveedor.
  return children;

};

/**
 * Componente raíz de TesloShop.
 * Envuelve la aplicación con los proveedores globales de estado, rutas,
 * notificaciones y herramientas de desarrollo.
 */
export const TesloShopApp = () => {

  return (

    // Envuelve la aplicación para proveer el contexto de React Query,
    // a cualquier componente hijo que lo necesite
    // (permitiendo usar hooks como useQuery o useMutation en cualquier parte de la app).
    <QueryClientProvider client={queryClient}>
        {/* Custom provider proveedor de autenticación */}
        <CheckAuthProvider>
          {/* Sistema de enrutamiento principal basado en app.router.tsx */}
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>
        {/* Contenedor global de alertas emergentes (toaster), de la librería de terceros sonner */}
        <Toaster />
        {/* Añade una herramienta de desarrollo flotante para depurar el estado de peticiones, caché y errores mientras desarrollas (comienza cerrada por defecto */}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  );

};
