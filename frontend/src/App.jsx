
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ResourcesPage from "./pages/ResourcesPage";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


import ProductDetailPage from "./pages/ProductDetailPage";
import AdminDashboard from "./pages/AdminDashboard";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/products"
        element={<ProductsPage />}
      />


      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsDetailPage />} />
      <Route
        path="/resources"
        element={<ResourcesPage />}
      />

      <Route
        path="/support"
        element={<SupportPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignupPage />}
      />



      <Route
        path="/insurance/product/:id"
        element={<ProductDetailPage />}
      />

      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

    </Routes>
  );
}

export default App;