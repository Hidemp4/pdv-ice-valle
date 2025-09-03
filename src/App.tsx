import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sales from "./layouts/Sales";
import Home from "./layouts/Home";
const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
};

export default App;
