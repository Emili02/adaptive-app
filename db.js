import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'your_db_user', // Замените на ваше имя пользователя базы данных
  host: 'localhost',
  database: 'new_onboarding_db', // Замените на имя вашей базы данных
  password: 'your_db_password', // Замените на ваш пароль базы данных
  port: 5432,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

export { pool, connectDB };

