import { useEffect, useState } from 'react'
import { Link } from 'react-router'

type Pizza = {
    id: number
    customer: string
    size: string
    shape: string
    topping: string
    price: string | number
}

function View() {
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const deletePizza = async (id: number) => {
        setError('')

        try {
            const response = await fetch(`http://localhost:3001/pizzas/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const result = await response.json()
                setError(result.error || 'Could not delete pizza.')
                return
            }

            setPizzas((prev) => prev.filter((pizza) => pizza.id !== id))
        } catch {
            setError('Cannot reach the pizza server. Start the backend on port 3001 and try again.')
        }
    }

    useEffect(() => {
        const getPizzas = async () => {
            try {
                const response = await fetch('http://localhost:3001/pizzas')

                if (!response.ok) {
                    const result = await response.json()
                    setError(result.error || 'Could not load pizzas.')
                    return
                }

                const data = await response.json()
                setPizzas(data)
            } catch {
                setError('Cannot reach the pizza server. Start the backend on port 3001 and try again.')
            } finally {
                setLoading(false)
            }
        }

        getPizzas()
    }, [])

    return (
        <div className="min-h-screen bg-regal-blue p-8 text-white">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-4xl font-bold">Pizza Orders</h1>
                <Link
                    to="/new"
                    className="rounded-md bg-red-500 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-red-600"
                >
                    New Pizza
                </Link>
            </div>

            {loading && <p>Loading pizzas...</p>}

            {error && <p className="rounded-md bg-red-100 p-4 font-semibold text-red-700">{error}</p>}

            {!loading && !error && pizzas.length === 0 && (
                <p>No pizzas yet. Create one first.</p>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pizzas.map((pizza) => (
                    <article
                        key={pizza.id}
                        className="rounded-md bg-white p-5 text-slate-900 shadow-lg"
                    >
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <h2 className="text-2xl font-bold">{pizza.customer}</h2>
                            <p className="rounded-md bg-red-500 px-3 py-1 font-bold text-white">
                                ${pizza.price}
                            </p>
                        </div>

                        <div className="space-y-2 text-lg">
                            <p>
                                <span className="font-semibold">Size:</span> {pizza.size}
                            </p>
                            <p>
                                <span className="font-semibold">Shape:</span> {pizza.shape}
                            </p>
                            <p>
                                <span className="font-semibold">Topping:</span> {pizza.topping}
                            </p>
                        </div>

                        <div className="mt-5 flex gap-3">
                            <button
                                type="button"
                                onClick={() => deletePizza(pizza.id)}
                                className="rounded-md bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <Link
                                to={`/edit/${pizza.id}`}
                                className="rounded-md bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                            >
                                Update
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default View
