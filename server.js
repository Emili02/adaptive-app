import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { pool, connectDB } from './db.js';
о
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/onboarding', async (req, res) => {
  try {
    console.log('Request received: GET /api/onboarding');
    const result = await pool.query('SELECT * FROM onboarding');
    console.log('Data from onboarding table:', result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching onboarding data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});