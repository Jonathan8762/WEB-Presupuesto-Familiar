import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MenuLateral from "./components/MenuLateral";
import Customers from "./pages/customers/Customers";
import Plan from "./pages/customers/Plan";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <main>
        <MenuLateral open={drawerOpen} toggleDrawer={toggleDrawer} />
        <section id="contenido">
          <Routes>
            <Route path="/Plan" element={<Plan />} />
            <Route path="/Ingresos" element={<Customers />} />
            <Route path="/Gastos" element={<h1>Gastos</h1>} />
            <Route path="/Miembros" element={<h1>Miembros</h1>} />
          </Routes>
        </section>
      </main>
    </>
  );
};

export default App;
