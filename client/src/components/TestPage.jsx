import React, { useState } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const questions = {
  слесарь: [
    { id: 1, question: 'Вопрос 1 для слесаря', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 2, question: 'Вопрос 2 для слесаря', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 3, question: 'Вопрос 3 для слесаря', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 4, question: 'Вопрос 4 для слесаря', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
  ],
  делопроизводитель: [
    { id: 5, question: 'Вопрос 5 для делопроизводителя', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 6, question: 'Вопрос 6 для делопроизводителя', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 7, question: 'Вопрос 7 для делопроизводителя', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 8, question: 'Вопрос 8 для делопроизводителя', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
  ],
  механник: [
    { id: 9, question: 'Вопрос 9 для механника', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 10, question: 'Вопрос 10 для механника', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 11, question: 'Вопрос 11 для механника', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
    { id: 12, question: 'Вопрос 12 для механника', options: ['Ответ 1', 'Ответ 2', 'Ответ 3'] },
  ],
};

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswers({
      ...answers,
      [questions[position][currentQuestionIndex].id]: event.target.value,
    });
  };

  const handleNextQuestion = async () => {
    try {
      const response = await axios.post('/api/users/complete-test', { position });
      if (response.status === 200) {
        setTestCompleted(true);
        navigate('/next-step');
      } else {
        setError('Ошибка при завершении теста');
      }
    } catch (error) {
      console.error('Ошибка при завершении теста:', error);
      setError('Ошибка при завершении теста');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', {
        username: credentials.username,
        password: credentials.password,
      });
      if (response.data.success) {
        navigate('/dashboard'); // Перенаправление на главную страницу после входа
      } else {
        console.error('Ошибка при входе');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Выберите вашу должность</Typography>
      <Select
        fullWidth
        value={position}
        onChange={handlePositionChange}
        displayEmpty
      >
        <MenuItem value="" disabled>Выберите должность</MenuItem>
        <MenuItem value="слесарь">Слесарь</MenuItem>
        <MenuItem value="механник">Механник</MenuItem>
        <MenuItem value="делопроизводитель">Делопроизводитель</MenuItem>
        {/* Добавьте другие варианты */}
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNextQuestion}
        sx={{ mt: 2 }}
        disabled={!position} // Кнопка неактивна, пока не выбрана должность
      >
        Завершить тест
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default TestPage; 