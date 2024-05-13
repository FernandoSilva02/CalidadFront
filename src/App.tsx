import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registro from "./components/Registro";
import Login from "./components/Login";
import MainMenu from "./components/MainMenu";
import Parametro from "./components/Parametro";
import Evaluacion from "./components/Evaluacion";
import EvaluacionForm from "./components/EvaluacionForm";
import Total from "./components/Total";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<MainMenu />} />
        <Route path="/evaluacion" element={<Evaluacion />} />
        <Route path="/evaluacion/:id" element={<EvaluacionForm />} />
        <Route path="/total" element={<Total />} />
        <Route path="/:id" element={<Parametro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
