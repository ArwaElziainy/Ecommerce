import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/NotFound/NotFound";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ForgetPassword from "./Components/ForgetPass/Forget-Password";
import ResetPassword from "./Components/ResetPass/ResetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import LoginProtected from "./Components/LoginProtected/LoginProtected";
import Categories from "./Components/Categories/Categories";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Wishlist from "./Components/Wishlist/Wishlist";
import CheckoutForm from "./Components/CheckoutForm/CheckoutForm";
import AllOrders from "./Components/AllOrders/AllOrders";
import Search from "./Components/Search/Search";



function App() {
  let routers = createBrowserRouter([
    {
      Path: "",
      element: <Layout />,
      children: [
        { path: "Ecommerce", element: <Navigate to={""} /> },
        { path: "", element: <Navigate to={"home"} /> },
        { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "login", element: <LoginProtected><Login /></LoginProtected> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-code", element: <VerifyCode /> },

        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "product-details/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "checkout/:id", element: <ProtectedRoute><CheckoutForm /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "search", element: <ProtectedRoute><Search /></ProtectedRoute> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

 

  return (
    <>
      <RouterProvider router={routers}>
       
      </RouterProvider>
    </>
  );
}

export default App;
