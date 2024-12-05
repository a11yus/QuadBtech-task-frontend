import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Dashboard from "../pages/userPages/Dashboard";
import { useSelector } from "react-redux";
import Login from "../components/Auth/Login";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import SignUp from "../components/Auth/SignUp";
import Products from "../pages/userPages/Products";
import ProductDetail from "../pages/userPages/ProductDetail";
import ShoppingCart from "../pages/userPages/ShoppingCart";
import EditProduct from "../pages/adminPages/EditProduct";
import CreateProduct from "../pages/adminPages/CreateProduct";
import ProductStock from "../pages/adminPages/ProductStock";
import AllProducts from "../pages/adminPages/AllProducts";
import Checkout from "../pages/userPages/Checkout";
import OrderComplete from "../pages/userPages/OrderComplete";

const AllRoutes = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  console.log("isUserLoggedIn", isUserLoggedIn);
  

  // ProtectedRoute for user access
  const ProtectedRoute = ({ children }) => {

    if (!isUserLoggedIn) {
      console.warn("Access denied: User is not logged in");
      return <Login />;
    }
    return children;
  };

  // AdminRoute for admin-only access
  const AdminRoute = ({ children }) => {
    console.log("admin here", isAdmin);
    
    // if (!isUserLoggedIn) {
    //   console.warn("Access denied: User is not logged in");
    //   return <Navigate to="/login" replace />;
    // }
    if (isAdmin !== "admin") {
      console.warn("Access denied: User is not an admin");
      return <Navigate to="/" replace />;
    }
    return children;
  }; 
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          // <ProtectedRoute>
            <Dashboard />
          // </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/products"
        element={
          // <ProtectedRoute>
            <Products />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          // <ProtectedRoute>
            <ProductDetail />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          // <ProtectedRoute>
            <ShoppingCart />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          // <ProtectedRoute>
            <Checkout />
          // </ProtectedRoute>
        }
      />

      <Route
        path="/orderComplete"
        element={
          // <ProtectedRoute>
            <OrderComplete />
          // </ProtectedRoute>
        }
      />

       {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          // <AdminRoute>
            <AdminDashboard />
          // </AdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          // <AdminRoute>
            <AllProducts />
          // </AdminRoute>
        }
      />

      <Route
        path="/admin/editProduct/:product_id"
        element={
          // <AdminRoute>
            <EditProduct />
        //  </AdminRoute>
        }
      />

      <Route
        path="/admin/createProduct"
        element={
          // <AdminRoute>
            <CreateProduct />
          // </AdminRoute>
        }
      />

      <Route
        path="/admin/productStock"
        element={
          // <AdminRoute>
            <ProductStock />
          // </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
