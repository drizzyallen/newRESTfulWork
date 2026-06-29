import pg from 'pg'
import './dotenv.js'

const env = (key) => process.env[key]?.trim()

const config = {
    user: env('PGUSER'),
    password: env('PGPASSWORD'),
    host: env('PGHOST'),
    port: env('PGPORT'),
    database: env('PGDATABASE'),
    ssl: env('PGSSL') === 'true'
        ? { rejectUnauthorized: false }
        : false,
}

export const pool = new pg.Pool(config)
