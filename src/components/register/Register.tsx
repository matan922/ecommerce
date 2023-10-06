import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Register.scss'

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;


    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      email,
      password,
    };

  
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Registration Successful!');
      } else {
        alert('Registration failed. Please try again!');
      }
    } catch (error) {
      console.error('Error:', error);
    }

   
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </div>
    </form>
  );
};

export default Register;
