import { useState } from 'react'
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
      <div>{pokemonList.map((pokemon,id) => (
        <div></div>
      ))}</div>
 
    </div>
  )
}

export default App
