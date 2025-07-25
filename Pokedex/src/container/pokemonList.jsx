import React, { useState, useEffect } from 'react'

export default function PokemonList() {
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const linkPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=200/'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(linkPokemon)
                const data = await response.json()
                setPokemon(data.results)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!pokemon) return <div>No Pokémon found</div>

    return (
        <div>
            <div>
                {pokemon.map((p, index) => (
                    <li key={index}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={p.name} />
                        <h1>{p.name}</h1>
                    </li>
                ))}
            </div>
        </div>
    )
}
