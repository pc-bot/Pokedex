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
    <h2 className='text-center'>Liste des Pokémon</h2>
    <div className=''>
      {pokemonList.map((pokemon, index) => (
        <div key={index} className=''>
          <img src={pokemon.image} alt={pokemon.name} width="96" height="96" />
          <div className='bg-yellow 300'>
            <div className='flex flex-row'>
              <p>id : </p>
              <p>{index + 1}</p>
            </div>
            <div className='flex flex-row'>
              <p>nom : </p>
              <p />{pokemon.name}<p/>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}

export default App
