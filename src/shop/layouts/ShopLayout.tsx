import { Outlet } from "react-router"


export const ShopLayout = () => {
  return (
    <div>
      ShopLayout

      {/* Renderiza la ruta hija coincidente de una ruta padre o nada si ninguna ruta hija coincide. */}
      <Outlet />

    </div>


  )
}
