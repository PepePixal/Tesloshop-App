
import { useRef, type KeyboardEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const CustomHeader = () => {

  // obtener los query params de la url y la func para modificarlos
  const [ searchParams, setSearchParams ] = useSearchParams();

  // obtener los parámetros de la ruta
  const { gender } = useParams();
  console.log({gender});

  // retorna obj. para almacenar (valor del elemento html Input referido), inicializado a null.
  // La modificación del valor del obj. generado con el useRef NO rerenderiza
  const inputRef = useRef<HTMLInputElement>(null);

  // obtiene valor del query param 'query' o asigna ''
  const query = searchParams.get('query') || '';

  // func. manejadora del evento de teclado, en el input del buscador
  const handleSearch = (event:  KeyboardEvent<HTMLInputElement>) => {
    // valida, Si la tecla presionada no es Enter, detiene la ejecución de la func.
    if (event.key !== 'Enter') return;

    // Obtiene el valor actual de la referencia del input y
    // lo asigna a query
    const query = inputRef.current?.value;

    // Crea una instancia vacia de URLSearchParams (obj. vacio),
    // para manejar los parámetros de la URL
    const newSearchParams = new URLSearchParams();

    // si query NO tiene un string
    if ( !query ) {
      // elimina el param param 'query' del obj.
      newSearchParams.delete('query');
      
    // como query contiene un string (texto del input)  
    } else {
      // Agrega o actualiza el param con key 'query', con el texto del input, al obj.
      newSearchParams.set('query', query);
    };

    // Actualiza los params de la URL, reescribiendo el nuevo param en searchParams.
    // No mantiene los params (page, size, etc) anteriores. Intenciaonadamente.
    setSearchParams(newSearchParams);
  };

  return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold tracking-tight">TESLA STYLE</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                //si no existe el param gender en la url, estamos en Todos, poner surayado al enlace
                !gender ? 'underline underline-offset-4' : ''
              )}
            >
              Todos
            </Link>
            <Link
              to="/gender/men"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                //si el param gender de la url es = 'men', estamos Hombre, poner surayado al enlace
                gender === 'men' ? 'underline underline-offset-4' : ''
              )}
            >
              Hombres
            </Link>
            <Link
              to="/gender/women"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender === 'women' ? 'underline underline-offset-4' : ''
              )}
            >
              Mujeres
            </Link>
            <Link
              to="/gender/kid"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender === 'kid' ? 'underline underline-offset-4' : ''
              )}            
            >
              Niñ@s
            </Link>
          </nav>

          {/* Search / Login / Admin */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-9 w-64 h-9 bg-white"
                  // referencia al useRef
                  ref={inputRef}
                  // Cada vez que se pulsa una tecla, llama a la func. manejadora
                  onKeyDown={handleSearch}
                  defaultValue={query}
                />
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Login */}
            <Link to="auth/login">
              <Button 
                variant='default'
                size='sm'
                className="ml-2"
              >
                Login
              </Button>
            </Link>

            {/* Admin */}
            <Link to="/admin">
              <Button 
                variant='destructive'
                size='sm'
                className="ml-2"
              >
                Admin
              </Button>
            </Link>
            
          </div>
        </div>
      </div>
    </header>;
};