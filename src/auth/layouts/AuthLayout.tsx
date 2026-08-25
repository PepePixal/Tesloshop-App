
import { Outlet } from "react-router";


const AuthLayout = () => {
  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <Outlet />
        </div>
    </div>
  )
}


// exporta por defecto (para carga lazy en router)
export default AuthLayout;