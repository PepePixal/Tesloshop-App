
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router";

export const FilterSidebar = () => {

  // retorna url params de la url activa, y func. para actualizar sus estados
  const [searchParams, setSearchParams ] = useSearchParams();

  // obtiene los valores (xl,l,s) del url param 'sizes' de searchParams,
  // si otiene valores ? los convierte a arreglo, si no ||, retorna []
  const currentSizes = searchParams.get('sizes')?.split(',') || [];
  
  //obtiene el valor del url param 'price' o asigna 'any'
  const currentPrice = searchParams.get('price') || 'any';

  // func. manejadora de las tallas sizes, recibe size
  const handleSizeChanged = ( size: string ) => {
    // determina si currentSizes contiene la size recibida:
    const newSizes = currentSizes.includes(size)
      // si la contiene, filtra el arreglo y obtiene un nuevo arreglo
      // solo con las tallas (s) diferentes a la talla recibida
      ? currentSizes.filter( s => s !== size )
      // si NO la contiene, propaga y agrega el valor de la nueva talla recibida, al arreglo
      : [... currentSizes, size]
    // el resultado se asigna a newSizes

    // asigna '1' al valor de la paginación,
    searchParams.set('page', '1');

    // agrega al url param 'sizes', los nuevos valores del arreglo newSizes
    // separados por comas como string
    searchParams.set('sizes', newSizes.join(','))

    // Actualiza la url, con el nuevo estado de los params de searchParams,
    // preservando los valores de los params existentes
    setSearchParams(searchParams);
  };

  // func. manejo cambios prcios del filtro, recibe price
  const handlePriceChange = ( price: string ) => {

    // asigna '1' al valor de la paginación 
    searchParams.set('page', '1');

    // asigna el valor del param recibido price, al url param 'price'
    searchParams.set('price', price);

    // Actualiza la url, con el nuevo estado de los params de searchParams,
    // preservando los valores de los params existentes
    setSearchParams(searchParams);
  }

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ];

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Tallas</h4>
        <div className="grid grid-cols-3 gap-2">
          {/* mapea el arreglo sizes y por cada elemento size,
              crea un botón con una key única */}
          {sizes.map((size) => (
            <Button
              key={size.id}
              //si la talla ya estaba seleccionada, botón variante= 'default', si no, 'outline'
              variant={ currentSizes.includes(size.id) ? 'default' : 'outline'}
              size="sm"
              className="h-8"
              onClick={() => handleSizeChanged(size.id)}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Precio</h4>
        <RadioGroup 
          className="space-y-3"
          value={currentPrice} 
          onValueChange={(value) => handlePriceChange(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="priceAny"/>
            <Label htmlFor="priceAny" className="text-sm cursor-pointer">Cualquier precio</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0-50" id="price1" />
            <Label htmlFor="price1" className="text-sm cursor-pointer">$0 - $50</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50-100" id="price2" />
            <Label htmlFor="price2" className="text-sm cursor-pointer">$50 - $100</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100-200" id="price3" />
            <Label htmlFor="price3" className="text-sm cursor-pointer">$100 - $200</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="200+" id="price4" />
            <Label htmlFor="price4" className="text-sm cursor-pointer">$200+</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

