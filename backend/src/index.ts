import express from 'express';
import pool from './db';

const app = express();
app.use(express.json());

app.get('/api/data', async (req: Request, res: Response) => {
    try {
      const { rows } = await pool.query('SELECT * FROM your_table');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });
  
  const PORT = parseInt(process.env.PORT || '5000', 10);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));