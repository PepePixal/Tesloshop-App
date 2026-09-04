/*
Custom hook para obtener, gestionar, almacenar en caché y
actualizar los datos de los productos, utilizando Tanstack React Query
*/

import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";

// custom hook
export const useProducts = () => {

  // todo: falta lógica de programación
  // obtiene todos los search params de la URL actual
  const [ searchParams ] = useSearchParams();

  // obtiene los params limit y page de searchParams
  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;

  // calcula cuantos productos iniciales salta,
  // según la página solicitada y el límite de products por página.
  const offset = (Number(page) - 1) * Number(limit)
  
  // hook de Tanstack React Query
  return useQuery({
    queryKey: ['products', { offset, limit }],
    // llama nuestra func. enviando props
    queryFn: () => getProductsAction({
      // valida por si limit y offset no son tipo number
      limit: isNaN( +limit ) ? 9 : limit,
      offset:isNaN( offset ) ? 0 : offset,
    }),
    //matener en caché el último resultado de la petición http.
    staleTime: 1000 * 60 * 5, //5 min en caché
  });

};
