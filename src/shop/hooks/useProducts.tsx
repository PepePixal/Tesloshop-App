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

  // calcula cuantos productos iniciales salta,
  // según la página solicitada y el límite de products por página.
  const offset = (Number(page) - 1) * Number(limit)

  //** Par obtener productus filtrados por rango de precios.**//
  // Sabemos que la api nos permite enviar los params minPrice y maxPrice.
  // Obtiene el valor del search param 'price' o asinga 'any'
  const price = searchParams.get('price') || 'any';
  //define variables
  let minPrice = undefined;
  let maxPrice = undefined;
  // según el valor de price, asigna valores a min y maxPrice
  switch(price){
    // si price es = 'any' las vars son undefinde por defecto.
    case '0-50':
      minPrice = 0;
      maxPrice = 50;
    break;
    case '50-100':
      minPrice = 50;
      maxPrice = 100;
    break;
    case '100-200':
      minPrice = 100;
      maxPrice = 200;
    break;
    case '200+':
      minPrice = 201;
      maxPrice = undefined;
    break;
  }

  /*
  Otra forma de asignar valores a 'minPrice' y 'maxPrice', según el valor de 'price':
    const limitPrice = searchParams.get('price') || 'any';
    const [minPrice, maxPrice] = limitPrice === 'any' ? [undefined, undefined] : limitPrice.split('-');
  */

  // hook de Tanstack React Query
  return useQuery({
    queryKey: ['products', { offset, limit, gender, sizes, minPrice, maxPrice }],
    // llama nuestra func. enviando props
    queryFn: () => getProductsAction({
      // valida por si limit y offset no son tipo number
      limit: isNaN( +limit ) ? 9 : limit,
      offset:isNaN( offset ) ? 0 : offset,
      gender: gender, // se puede poner solo: gender,
      sizes: sizes,   // se puede poner solo: sizes, 
      minPrice,       // es lo mismo que:  minPrice: minPrice,
      maxPrice,       // es lo mismo que:  maxPrice: maxPrice
    }),
    //matener en caché el último resultado de la petición http.
    staleTime: 1000 * 60 * 5, //5 min en caché
  });

};
