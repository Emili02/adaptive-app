import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Шапка (Header) */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Логотип компании</a>
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Button color="inherit">О платформе</Button>
            <Button color="inherit">Поддержка</Button>
            <Button color="inherit">Контакты</Button>
          </Box>
          <Button color="inherit" onClick={() => navigate('/login')}>Войти</Button>
        </Toolbar>
      </AppBar>

      {/* Основной экран (Hero section) */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" gutterBottom>
            Добро пожаловать в систему онбординга!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Эта платформа поможет вам быстро адаптироваться, изучить важную информацию о компании и подготовиться к работе.
          </Typography>
          <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={() => navigate('/test')}>
            Начать тестирование
          </Button>
          <Button variant="outlined" color="primary" sx={{ m: 1 }} onClick={() => navigate('/register')}>
            Зарегистрироваться
          </Button>
        </Box>

        {/* Блок "Как это работает" (Steps section) */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Пройдите тест</Typography>
              <Typography>Определите уровень знаний и выявите возможные ограничения.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Получите персональный план обучения</Typography>
              <Typography>Изучите курсы, пройдите VR-практику.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>Приступите к работе</Typography>
              <Typography>После успешного завершения обучения.</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Блок "Преимущества платформы" */}
        <Box mt={4} textAlign="center">
          <Typography variant="h4" gutterBottom>Преимущества платформы</Typography>
          <Typography>✅ Индивидуальный подход к обучению</Typography>
          <Typography>✅ Контроль прогресса и обратная связь</Typography>
          <Typography>✅ Доступ к курсам 24/7</Typography>
        </Box>
      </Container>

      {/* Подвал (Footer) */}
      <Box component="footer" sx={{ mt: 4, py: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
        <Typography>Контактные данные: email@example.com, +7 (123) 456-78-90</Typography>
        <Typography>Политика конфиденциальности</Typography>
        <Typography>Соцсети: [Иконки соцсетей]</Typography>
      </Box>
    </div>
  );
};

export default HomePage; 