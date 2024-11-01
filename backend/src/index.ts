import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import pool from './db';

const app: Express = express();
app.use(cors());
app.use(express.json());

// Define a route to get data from the leaderboard
app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM leaderboard ORDER BY score DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

app.post('/api/leaderboard', async (req: Request, res: Response) => {
  try {
    const { game, username, mode, score, time_ms } = req.body
    const result = await pool.query(
      'INSERT INTO leaderboard (game, username, mode, score, time_ms) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [game, username, mode, score, time_ms]
    );
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Set the port to listen on
const PORT = parseInt(process.env.PORT || '5001')

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
