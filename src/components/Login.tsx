import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  FormContainer,
  Title,
  FormGroup,
  Label,
  Input,
  Button,
  BottomText,
} from '../styles/LoginStyles';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3230/api/usuarios/login', formData);
      console.log(response.data);
      alert('Inicio de sesión exitoso.'); // Mostrar alerta de inicio de sesión exitoso
      window.location.href = '/home'; // Redirigir a la página principal
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
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
