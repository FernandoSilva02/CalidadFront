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

const Registro: React.FC = () => {
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
      const response = await axios.post('http://localhost:3230/api/usuarios/', formData);
      console.log(response.data);
      alert('Registro exitoso. Por favor, inicia sesión.'); // Mostrar alerta de registro exitoso
      window.location.href = '/'; // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Registro</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          </FormGroup>
          <Button type="submit">Registrarse</Button>
        </form>
        <BottomText>
          ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
        </BottomText>
      </FormContainer>
    </Container>
  );
};

export default Registro;
