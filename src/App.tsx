import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from "./layouts/Reports";
import Home from "./layouts/Home";
const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
};

export default App;
