import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import pool from './db.js'; // Импортируем подключение к PostgreSQL
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Получение пути к текущему файлу и директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Проверка подключения к базе данных PostgreSQL
pool.connect()
  .then(client => {
    console.log('PostgreSQL connected');
    // Выполнение тестового запроса
    return client.query('SELECT NOW()')
      .then(res => {
        console.log('Текущая дата и время из базы данных:', res.rows[0]);
        client.release();
      })
      .catch(err => {
        client.release();
        console.error('Ошибка выполнения тестового запроса:', err);
      });
  })
  .catch(err => console.error('Ошибка подключения к PostgreSQL:', err));

// Подключение маршрутов
app.use('/api/users', userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.post('/api/users/register', (req, res) => {
  const { lastName, firstName, middleName } = req.body;
  // Логирование входящих данных
  console.log('Получен запрос на регистрацию:', { lastName, firstName, middleName });

  // Проверка входных данных
  if (!lastName || !firstName || !middleName) {
    console.error('Ошибка: Фамилия, имя и отчество обязательны');
    return res.status(400).json({ error: 'Фамилия, имя и отчество обязательны' });
  }

  // Генерация логина
  const login = `${lastName}${firstName[0]}${middleName[0]}`.toLowerCase();

  // Генерация случайного пароля
  const password = crypto.randomBytes(8).toString('hex');

  // Пример успешного ответа
  try {
    // Здесь добавьте логику для сохранения пользователя в базе данных
    console.log('Пользователь успешно зарегистрирован:', { login, password });
    res.status(201).json({ message: 'Пользователь зарегистрирован', login, password });
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;