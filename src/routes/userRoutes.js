import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { transliterate as tr } from 'transliteration';

const router = express.Router();

// Функция для генерации случайного пароля
const generateRandomPassword = (length = 8) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { lastName, firstName, middleName, position, age, disability } = req.body;

  // Генерация логина
  const initials = `${firstName[0]}${middleName[0]}`;
  const username = tr(`${lastName}${initials}`).toLowerCase();

  // Генерация пароля
  const password = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      'INSERT INTO users (name, position, age, disability, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [`${lastName} ${firstName} ${middleName}`, position, age, disability, username, hashedPassword]
    );
    console.log('Новый пользователь добавлен:', newUser.rows[0]);
    res.status(201).json({ username, password });
  } catch (error) {
    console.error('Ошибка при добавлении пользователя:', error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
});

// Завершение теста и генерация логина и пароля
router.post('/complete-test', async (req, res) => {
  const { /* данные теста */ } = req.body;
  // Генерация логина и пароля
  const username = 'generatedUsername';
  const password = 'generatedPassword';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.json({ username, password });
  } catch (error) {
    console.error('Ошибка при добавлении пользователя:', error);
    res.status(500).json({ error: 'Ошибка при завершении теста' });
  }
});

// Вход пользователя
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ error: 'Ошибка при входе' });
  }
});

export default router; 