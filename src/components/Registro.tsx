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

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3230/api/usuarios/', formData);
      console.log(response.data);
      alert('Registro exitoso. Por favor, inicia sesión.');
      window.location.href = '/';
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Error al registrar. Intenta nuevamente.');
    }
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    if (!validatePassword(newPassword)) {
      setError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un símbolo.');
    } else {
      setError(null);
    }
  };
  
  return (
    <Container>
      <FormContainer>
        <Title>Registro</Title>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar el error aquí */}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handlePasswordChange} />
          </FormGroup>
          <FormGroup>
            <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            <Label htmlFor="showPassword">Mostrar contraseña</Label>
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
