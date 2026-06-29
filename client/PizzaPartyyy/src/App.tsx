//import { useState } from 'react'
import { Link } from 'react-router'
import image from '../public/pizzaAHH.webp'
import './App.css'

function App() {
  

 
  return (
    <>
      <div className="h-screen bg-regal-blue">
        <h1 className="text-5xl font-bold text-heading">PIZZA<small className="ms-2 font-medium text-body">We Munch Pizzas</small></h1>
        <img src={image}/>
        <Link
          to="/new"
          className="mt-6 inline-flex items-center rounded-md bg-red-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-red-600 hover:shadow-xl"
        >
          New Pizza
        </Link>
        <br></br>
        <Link
          to="/view"
          className="mt-6 inline-flex items-center rounded-md bg-red-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-red-600 hover:shadow-xl"
        >
          View Pizza
        </Link>
        
      </div>
      
    </>
  )
}

export default App
