/*import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ResourcesPage from "./pages/ResourcesPage";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App; */

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ResourcesPage from "./pages/ResourcesPage";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HealthInsurancePage from "./pages/HealthInsurancePage";
import LifeInsurancePage from "./pages/LifeInsurancePage";
import CarInsurancePage from "./pages/CarInsurancePage";
import BikeInsurancePage from "./pages/BikeInsurancePage";
import HomeInsurancePage from "./pages/HomeInsurancePage";
import TravelInsurancePage from "./pages/TravelInsurancePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/login" element={<LoginPage />} />
       <Route path="/signup" element={<SignupPage />} />
      <Route path="/insurance/health" element={<HealthInsurancePage />} />
      <Route path="/insurance/life" element={<LifeInsurancePage />} />
      <Route path="/insurance/car" element={<CarInsurancePage />} />
      <Route path="/insurance/bike" element={<BikeInsurancePage />} />
      <Route path="/insurance/home" element={<HomeInsurancePage />} />
      <Route path="/insurance/travel" element={<TravelInsurancePage />} />
    </Routes>
  );
}

export default App;