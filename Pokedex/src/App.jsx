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
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 shadow-lg '>
      {pokemonList.map((pokemon, index) => (
        <div key={index} className='bg-gray-400 m-20 shadow-xl h-50 w-45'>
          <img src={pokemon.image} alt={pokemon.name} width="106" height="106" className='bg-blue-100 m-8 rounded-full'/>
          <div className='bg-red-500 text-center'>
            <div className='flex flex-row'>
              <p>id : </p>
              <p className=' text-center'> {index + 1}</p>
            </div>
            <div className='flex flex-row'>
              <p>nom : </p>
              <p /> {pokemon.name}<p/>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}

export default App
