import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sales from "./layouts/Sales";
import Home from "./layouts/Home";
import { CartProvider } from "./components/CartContext";

const App: React.FC = () => {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sales" element={<Sales />} />
            </Routes>
          </MainLayout>
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;
