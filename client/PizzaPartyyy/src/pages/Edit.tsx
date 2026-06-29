import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

const prices = {
    size: {
        small: 6,
        medium: 9,
        large: 12,
    },
    shape: {
        round: 8,
        square: 5,
    },
    topping: {
        'meat-lover': 7,
        vegetarian: 4,
    },
}

const toppingImages = {
    'meat-lover': '/top-view-of-beef-pizza-on-transparent-background-format-png.png',
    vegetarian: '/vegetarian-pizza-ad-image-on-transparent-background-png.png',
}

function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = useState({
        customer: '',
        size: '',
        shape: '',
        topping: '',
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const price =
        (prices.size[pizza.size as keyof typeof prices.size] || 0) +
        (prices.shape[pizza.shape as keyof typeof prices.shape] || 0) +
        (prices.topping[pizza.topping as keyof typeof prices.topping] || 0)
    const pizzaImage = toppingImages[pizza.topping as keyof typeof toppingImages]

    useEffect(() => {
        const getPizza = async () => {
            try {
                const response = await fetch(`http://localhost:3001/pizzas/${id}`)

                if (!response.ok) {
                    const result = await response.json()
                    setError(result.error || 'Could not load pizza.')
                    return
                }

                const data = await response.json()
                setPizza({
                    customer: data.customer || '',
                    size: data.size || '',
                    shape: data.shape || '',
                    topping: data.topping || '',
                })
            } catch {
                setError('Cannot reach the pizza server. Start the backend on port 3001 and try again.')
            } finally {
                setLoading(false)
            }
        }

        getPizza()
    }, [id])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setPizza((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const updatePizza = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        const updatedPizza = {
            ...pizza,
            price,
        }

        try {
            const response = await fetch(`http://localhost:3001/pizzas/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPizza),
            })

            if (response.ok) {
                navigate('/view')
                return
            }

            const result = await response.json()
            setError(result.error || 'Pizza could not be updated.')
        } catch {
            setError('Cannot reach the pizza server. Start the backend on port 3001 and try again.')
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="mx-auto max-w-xl rounded-md bg-white p-6 shadow">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Update Pizza</h1>
                    <Link to="/view" className="text-sm font-semibold text-slate-700 underline">
                        Back
                    </Link>
                </div>

                {loading && <p>Loading pizza...</p>}

                {!loading && (
                    <>
                        <div className="mb-4 rounded-md bg-slate-100 p-3 font-bold">
                            Price: ${price}
                        </div>

                        {pizzaImage && (
                            <img
                                src={pizzaImage}
                                alt={`${pizza.topping} pizza`}
                                className="mb-4 h-48 w-full object-contain"
                            />
                        )}

                        {error && <p className="mb-4 rounded-md bg-red-100 p-3 text-red-700">{error}</p>}

                        <form onSubmit={updatePizza} className="space-y-5">
                            <div>
                                <label htmlFor="customer" className="mb-1 block font-semibold">Customer Name</label>
                                <input
                                    type="text"
                                    id="customer"
                                    name="customer"
                                    value={pizza.customer}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-slate-300 px-3 py-2"
                                    required
                                />
                            </div>

                            <fieldset className="rounded-md border border-slate-300 p-4">
                                <legend className="px-2 font-semibold">Size</legend>
                                <label className="mr-4">
                                    <input type="radio" name="size" value="small" checked={pizza.size === 'small'} onChange={handleChange} required />
                                    <span className="ml-2">Small - $6</span>
                                </label>
                                <label className="mr-4">
                                    <input type="radio" name="size" value="medium" checked={pizza.size === 'medium'} onChange={handleChange} />
                                    <span className="ml-2">Medium - $9</span>
                                </label>
                                <label>
                                    <input type="radio" name="size" value="large" checked={pizza.size === 'large'} onChange={handleChange} />
                                    <span className="ml-2">Large - $12</span>
                                </label>
                            </fieldset>

                            <fieldset className="rounded-md border border-slate-300 p-4">
                                <legend className="px-2 font-semibold">Shape</legend>
                                <label className="mr-4">
                                    <input type="radio" name="shape" value="round" checked={pizza.shape === 'round'} onChange={handleChange} required />
                                    <span className="ml-2">Round - $8</span>
                                </label>
                                <label>
                                    <input type="radio" name="shape" value="square" checked={pizza.shape === 'square'} onChange={handleChange} />
                                    <span className="ml-2">Square - $5</span>
                                </label>
                            </fieldset>

                            <fieldset className="rounded-md border border-slate-300 p-4">
                                <legend className="px-2 font-semibold">Toppings</legend>
                                <label className="mr-4">
                                    <input type="radio" name="topping" value="meat-lover" checked={pizza.topping === 'meat-lover'} onChange={handleChange} required />
                                    <span className="ml-2">Meat lover - $7</span>
                                </label>
                                <label>
                                    <input type="radio" name="topping" value="vegetarian" checked={pizza.topping === 'vegetarian'} onChange={handleChange} />
                                    <span className="ml-2">Vegetarian - $4</span>
                                </label>
                            </fieldset>

                            <button
                                type="submit"
                                className="rounded-md bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                            >
                                Update Pizza
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default Edit
