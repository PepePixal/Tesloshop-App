/* 
 Func. Petición http de los products paginados, con Axios
*/

// imporata instancia personalizada de axios
import { tesloApi } from "@/api/tesloApi"
import type { ProductsResponse } from "@/interfaces/products.response";

// opciones (? opcionales) que puede recibir getProductsAction 
// para petición http, por paginación
interface Options {
    limit?: number | string;    //products por página
    offset?: number | string;   //products iniciales que se omiten
}

// furc. retorna Promise con data tipo <ProductsResponse>
export const getProductsAction = async( options: Options ):Promise<ProductsResponse> => {

    //destruct de las options recibidas
    const { limit, offset } = options;

    // petición http get con nuestra instancia de Axios tesloApi,
    // enviando url y params
    // la respuesta (data) debe ser tipo <ProductsResponse>,
    // destruc solo la prop data, de toda la respuesta
    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset,
        }
    });
    //console.log(data);

    /* Genera nuevo arreglo de productos, creando la url de cada image, de cada product */
    // mapea products y por cada product:
    const productsWithImageUrls = data.products.map((product) => ({
        // ... esparce todas las props de cada product, para poder tomar la prop images [],
        ...product,
        // mapea la prop images y por cada image, construye la url con el nombre de la image y
        // reasigna la url a images
        images: product.images.map(
            (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        ),
    }));


    // Retorna toda las props ... esparcidas, de la data,
    // y a la prop products le asigna el valor de la const productsWithImageUrls 
    return {
        ... data,
        products: productsWithImageUrls
    };

}