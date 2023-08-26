import { useState,useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon.jsx";
import axios from "axios";
import "./PokemonList.css";
function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

   async function fetchPokemon()  {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
    // console.log(res);
    const pokemonResults = res.data.results;
    // console.log(pokemonResults);
    const pokemonResultsPromise =  pokemonResults.map((pokemon) => axios.get(pokemon.url));
    // console.log(pokemonResultsPromise);
      const pokemonData = await axios.all(pokemonResultsPromise);
      // console.log(pokemonData);
      const result = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shinny,
                types: pokemon.types
            }
         });  
        //  console.log(result);
        setPokemonList(result); 
         setIsLoading(false);
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="pokemonList-wrapper">
      <h3 className="listname">Pokemon List</h3>
      <hr />
      <div className="pokeList">
          {(isLoading)?'Loading...' : 
          pokemonList.map((pokemon) => 
            <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} types={pokemon.types} />
          )}
      </div>
    </div>
  );
}
export default PokemonList;
