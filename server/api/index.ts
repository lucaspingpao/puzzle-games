import express, { Express, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import pool from './db';

const app: Express = express();

const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://paos-puzzles.vercel.app',
    'https://paos-puzzles-server.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());


app.post('/api/post-leaderboard/:game', async (req: Request, res: Response) => {
  const { game } = req.params;
  try {
    const { username, mode, score, time_ms } = req.body
    const result = await pool.query(
      'INSERT INTO leaderboard (game, username, mode, score, time_ms) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [game, username, mode, score, time_ms]
    );
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
});


// test endpoint
app.get('/api/hello', (req, res) => {
  res.send('hello world')
});


app.get('/api/get-leaderboard/:game', async (req: Request, res: Response) => {
  const { game } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT username, mode, score, time_ms FROM leaderboard WHERE game=$1 ORDER BY score DESC, time_ms LIMIT 10',
      [game]
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
});


// Set the port to listen on
const PORT = parseInt(process.env.PORT || '5001');

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the Express API
module.exports = app;