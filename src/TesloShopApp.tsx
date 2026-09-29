/*
Componente raíz que actúa como el contenedor principal de la aplicación,
envolviendo todo lo demás con los contextos necesarios para que las páginas funcionen
y puedan comunicarse con APIs de forma eficiente.
*/

import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"

// librería estándar para manejar peticiones, caché y sincronización de datos con servidores.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// librería de utilidades para desarrollo
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// paquete de terceros para renderizar mensajes en pantalla
import { Toaster } from 'sonner';

// Crea la instancia global del cliente de consultas.
// Este objeto se encarga de administrar la caché de todas las peticiones HTTP que haga tu aplicación.
const queryClient = new QueryClient();


export const TesloShopApp = () => {

  return (

    // Envuelve la aplicación para proveer el contexto de React Query
    // a cualquier componente hijo que lo necesite
    // (permitiendo usar hooks como useQuery o useMutation en cualquier parte de la app).
    <QueryClientProvider client={queryClient}>
        {/* Gestiona la navegación y las vistas de la aplicación basándose en las rutas definidas en el archivo externo app.router */}
        <RouterProvider router={appRouter} />
        {/* Añade una herramienta de desarrollo flotante para depurar el estado de peticiones, caché y errores mientras desarrollas (comienza cerrada por defecto */}
        <ReactQueryDevtools initialIsOpen={false} />
        {/* Permite renderizar componentes tipo toaster (alertas emergentes), de la librería de terceros sonner */}
        <Toaster />
    </QueryClientProvider>

  );

};
