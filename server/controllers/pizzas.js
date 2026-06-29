import { pool } from '../config/database.js'

const getPizzas = async (req,res) => {
    try {
        const results = await pool.query(`SELECT * FROM pizzas ORDER BY id ASC`)
        res.status(200).json(results.rows)
    }   
    catch (error) {
        res.status(409).json( { error: error.message })
    }
}

const getPizzaById = async (req, res) => {
    try{
        const selectQuery = `
            SELECT customer, size, shape, topping, price 
            FROM pizzas 
            WHERE id=$1 
        `
        const pizzaId = req.params.pizzaId
        const result = await pool.query(selectQuery, [pizzaId])
        res.status(200).json(result.rows[0])
    }
    catch (error) {
        console.error('error getting pizza', error)
        res.status(409).json( { error: error.message } )
    }
}

const createPizza = async (req, res) => {
    try {
        const { customer, size, shape, topping, price } = req.body //this parses from req.body
        const results = await pool.query(`
            INSERT INTO pizzas ( customer, size, shape, topping, price )
            VALUES($1, $2, $3, $4, $5)
            RETURNING *`,
            [customer, size, shape, topping, price]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        console.error('error creating pizza', error)
        res.status(409).json( { error: error.message } )
    }
}

const updatePizza = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { customer, size, shape, topping, price } = req.body
        const results = await pool.query(`
            UPDATE pizzas
            SET customer = $1, size = $2, shape = $3, topping = $4, price = $5
            WHERE id = $6
            RETURNING *`,
            [customer, size, shape, topping, price, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        console.error('error updating pizza', error)
        res.status(409).json( { error: error.message } )
    }
}

const deletePizza = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM pizzas WHERE id = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        console.error('error deleting pizza', error)
        res.status(409).json( { error: error.message } )
    }
}

export default {getPizzas, getPizzaById, createPizza, updatePizza, deletePizza}
