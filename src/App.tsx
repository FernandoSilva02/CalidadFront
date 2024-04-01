import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import FuncionalidadForm from "./components/FuncionalidadForm";
import FiablidadForm from "./components/FiabilidadForm";
import UsabilidadForm from "./components/UsabilidadForm";
import EficienciaForm from "./components/EficienciaForm";
import CapacidadForm from "./components/CapacidadForm";
import PortabilidadForm from "./components/PortabilidadForm";
import CalidadForm from "./components/CalidadForm";
import Total from "./components/Total";
import "./App.css";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/funcionalidad" element={<FuncionalidadForm />} />
            <Route path="/fiabilidad" element={<FiablidadForm />} />
            <Route path="/usabilidad" element={<UsabilidadForm />} />
            <Route path="/eficiencia" element={<EficienciaForm />} />
            <Route path="/capacidad" element={<CapacidadForm />} />
            <Route path="/portabilidad" element={<PortabilidadForm />} />
            <Route path="/calidad" element={<CalidadForm />} />
            <Route path="/total" element={<Total />} />
            <Route path="/" element={<MainMenu />} />
          </>
        ) : (
          <></>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
