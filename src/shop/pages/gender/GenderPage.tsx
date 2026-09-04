import { useParams } from "react-router"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"


export const GenderPage = () => {

  // retorna los parámetros dinámicos de la url y destruc el param gender
  const { gender } = useParams();

  const { data } = useProducts();

  // define genderLabel, cuyo valor depende del valor de gender (se puede hacer con un case)
  const genderLabel = 
    gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niñ@s';

  return (
        <>

          <CustomJumbotron title = {`Productos para ${ genderLabel }`} />
    
          <ProductsGrid products={data?.products || []}/>
    
          <CustomPagination totalPages={ data?.pages || 1} />
        
        </>
  )
}
