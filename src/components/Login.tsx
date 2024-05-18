import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  FormContainer,
  Title,
  FormGroup,
  Label,
  Input,
  Button,
  BottomText,
} from "../styles/LoginStyles";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3230/api/usuarios/login", formData);
      localStorage.setItem("token", response.data.token); // Almacenar el token en localStorage
      alert("Inicio de sesión exitoso.");
      window.location.href = "/home";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Intenta nuevamente.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Iniciar Sesión</Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit">Iniciar Sesión</Button>
        </form>
        <BottomText>
          ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
        </BottomText>
      </FormContainer>
    </Container>
  );
};

export default Login;
