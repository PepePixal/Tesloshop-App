import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { AdminRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";

// carga perezosa (lazy) de los layouts de auth y admin
const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));     //requiere export default
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));  //requeire export default

export const appRouter = createBrowserRouter([
    // Main routes
    {
        path: '/',
        // no requiere protección de ruta
        element: <ShopLayout />,
        // Las rutas children (hijas) NO inician con "/"
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'product/:idSlug',
                element: <ProductPage />
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]
    },

    // Auth Routes
    {
        path: '/auth',
        // comp. <AuthLayout> y sus children, envueltos por el com protector de ruta  <NotAuthenticatedRoute>
        element: (
            <NotAuthenticatedRoute>
                <AuthLayout />
            </NotAuthenticatedRoute>
        ),
        // Las rutas children (hijas) NO inician con "/"
        children: [
            // para que /auth lleve directamente la /auth/login
            {
                index: true,
                element: <Navigate to="/auth/login" />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    },

    // Admin Rotues
    {
        path: '/admin',
        // comp. <AdminLayout> y sus children, envueltos por el com protector de ruta  <AdminRoute>
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),
        // Las rutas children (hijas) NO inician con "/"
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'products',
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            }
        ]
    },

    // Ruta comodin, redireciona rutas falsas, al home
    {
        path: '*',
        element: <Navigate to='/' />
    } 

]);