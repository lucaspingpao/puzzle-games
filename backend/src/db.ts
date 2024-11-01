import pg from 'pg'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
})

export default pool