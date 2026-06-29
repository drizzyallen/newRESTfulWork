import express from 'express'
import pizzaController from '../controllers/pizzas.js'

const router = express.Router()

router.get('/:pizzaId', pizzaController.getPizzaById)
router.get('/', pizzaController.getPizzas)
router.post('/', pizzaController.createPizza)
router.delete('/:id', pizzaController.deletePizza)
router.patch('/:id', pizzaController.updatePizza)

export default router 
