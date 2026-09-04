/*
Custom hook para obtener, gestionar, almacenar en caché y
actualizar los datos de los productos, utilizando Tanstack React Query
*/

import { useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";

// custom hook
export const useProducts = () => {

  // obtiene el parmametro de ruta gender, de la URL actual
  const  { gender } = useParams();
  
  // obtiene todos los search o query params, de la URL actual
  const [ searchParams ] = useSearchParams();
  // obtiene los params limit, page y sizes de searchParams
  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const sizes = searchParams.get('sizes') || undefined;

  //console.log({sizes, gender});

  // calcula cuantos productos iniciales salta,
  // según la página solicitada y el límite de products por página.
  const offset = (Number(page) - 1) * Number(limit)
  
  // hook de Tanstack React Query
  return useQuery({
    queryKey: ['products', { offset, limit, gender, sizes }],
    // llama nuestra func. enviando props
    queryFn: () => getProductsAction({
      // valida por si limit y offset no son tipo number
      limit: isNaN( +limit ) ? 9 : limit,
      offset:isNaN( offset ) ? 0 : offset,
      gender: gender,
      sizes: sizes,
    }),
    //matener en caché el último resultado de la petición http.
    staleTime: 1000 * 60 * 5, //5 min en caché
  });

};
