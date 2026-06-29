import { pool } from './database.js'

const createPizzaTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS pizzas;

        CREATE TABLE IF NOT EXISTS pizzas (
            id SERIAL PRIMARY KEY,
            customer VARCHAR(255) NOT NULL,
            size VARCHAR(255) NOT NULL,
            shape VARCHAR(255) NOT NULL,
            topping VARCHAR(255) NOT NULL,
            price VARCHAR(10) NOT NULL
        )
    `

    try {
        await pool.query(createTableQuery)
        console.log('pizza table created successfully')
    } catch (err) {
        console.error('error creating pizza table', err)
    } finally {
        await pool.end()
    }
}

createPizzaTable()
