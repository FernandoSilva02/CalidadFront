import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registro from "./components/Registro";
import Login from "./components/Login";
import MainMenu from "./components/MainMenu";
import Parametro from "./components/Parametro";
import Evaluacion from "./components/Evaluacion";
import EvaluacionForm from "./components/EvaluacionForm";
import Total from "./components/Total";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <MainMenu />
          </ProtectedRoute>
        } />
        <Route path="/evaluacion" element={
          <ProtectedRoute>
            <Evaluacion />
          </ProtectedRoute>
        } />
        <Route path="/evaluacion/:id" element={
          <ProtectedRoute>
            <EvaluacionForm />
          </ProtectedRoute>
        } />
        <Route path="/total" element={
          <ProtectedRoute>
            <Total />
          </ProtectedRoute>
        } />
        <Route path="/:id" element={
          <ProtectedRoute>
            <Parametro />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
