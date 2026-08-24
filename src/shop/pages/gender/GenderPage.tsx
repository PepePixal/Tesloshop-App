import { useParams } from "react-router"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { products } from "@/mocks/products.mock"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"


export const GenderPage = () => {

  // retorna los parámetros dinámicos de la url y destruc el param gender
  const { gender } = useParams();

  // define genderLabel, cuyo valor depende del valor de gender (se puede hacer con un case)
  const genderLabel = 
    gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niñ@s';

  return (
        <>

          <CustomJumbotron title = {`Productos para ${ genderLabel }`} />
    
          <ProductsGrid products={products}/>
    
          <CustomPagination totalPages={7} />
        
        </>
  )
}
