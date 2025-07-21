import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [pokemonList, setPokemonList] = useState([]);

useEffect(() => {
  fetch('https://pokeapi.co/api/v2/pokedex/1/')
    .then((response) => response.json())
    .then((result) => {
      const pokemonPromises = result.pokemon_entries.map(entry => 
        fetch(entry.pokemon_species.url.replace('-species', ''))
          .then(res => res.json())
      );
      
      Promise.all(pokemonPromises).then(pokemonDetails => {
        const pokemonData = pokemonDetails.map(pokemon => ({
          name: pokemon.name,
          image: pokemon.sprites.front_default
        }));
        setPokemonList(pokemonData);
      });
    })
    .catch((error) => console.error("Erreur :", error));
}, []);

return (
  <div>
    <h2 className=''>Liste des Pokémon</h2>
    <div className='bg-red grid'>
      {pokemonList.map((pokemon, index) => (
        <div key={index}>
          <img src={pokemon.image} alt={pokemon.name} width="96" height="96" />
          <h1 />
          {pokemon.name}
          <h1 />
        </div>
      ))}
    </div>
  </div>
)
}

export default App
