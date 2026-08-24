
import { useRef, useState, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CustomHeader = () => {
  const [cartCount] = useState(3);

  // obtener los query params de la url y la func para modificarlos
  const [ searchParams, setSearchParams ] = useSearchParams();

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
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Camisetas
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Sudaderas
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Chaquetas
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Accesorios
            </a>
          </nav>

          {/* Search and Cart */}
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
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>}
            </Button>
          </div>
        </div>
      </div>
    </header>;
};