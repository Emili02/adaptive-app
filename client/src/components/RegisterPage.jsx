import React, { useState } from 'react';
import { Button, TextField, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [position, setPosition] = useState('');
  const [age, setAge] = useState('');
  const [disability, setDisability] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const login = cyrillicToLatin(`${lastName}${firstName[0]}${middleName[0]}`).toLowerCase();
      const password = generatePassword();

      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lastName, firstName, middleName, login, password, disability }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ошибка регистрации:', errorData);
        throw new Error('Ошибка регистрации');
      }
      const data = await response.json();
      console.log('Регистрация успешна:', data);
      navigate('/test');
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Ошибка при регистрации');
    }
  };

  const cyrillicToLatin = (text) => {
    const cyrillicToLatinMap = {
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ы': 'Y', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
  };

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Регистрация</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Отчество"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Должность"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          margin="normal"
          select
        >
          <MenuItem value="слесарь">Слесарь</MenuItem>
          <MenuItem value="механник">Механник</MenuItem>
          <MenuItem value="делопроизводитель">Делопроизводитель</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Возраст"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Степень ОВЗ"
          value={disability}
          onChange={(e) => setDisability(e.target.value)}
          margin="normal"
          select
        >
          <MenuItem value="глухота">Глухота</MenuItem>
          <MenuItem value="слепота">Слепота</MenuItem>
          {/* Добавьте другие варианты */}
        </TextField>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Далее
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;