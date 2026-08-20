import { Outlet } from "react-router"
import { CustomHeader } from "../components/CustomHeader"
import { CustomFooter } from "../components/CustomFooter"


export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">

      <CustomHeader />
     
      {/* Renderiza la ruta hija coincidente de una ruta padre o nada si ninguna ruta hija coincide. */}
      <Outlet />

      <CustomFooter />

    </div>


  )
}
