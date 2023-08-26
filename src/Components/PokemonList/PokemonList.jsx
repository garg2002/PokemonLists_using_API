import { useState,useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon.jsx";
import axios from "axios";
import "./PokemonList.css";
function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const[pokedexUrl, setPokedexUrl] =useState ("https://pokeapi.co/api/v2/pokemon");

  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

   async function fetchPokemon()  {
    setIsLoading(true);
    //this downloads list of 20 pokemons
    const res = await axios.get(pokedexUrl);
    // console.log(res);

    //here we get the array of pokemons from res.data.results
    const pokemonResults = res.data.results;
    console.log(pokemonResults);

    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);

    //now iterating over the array of pokemons and fetching data for each pokemon by using their url , and create array of promises that will download those 20 pokemons
    const pokemonResultsPromise =  pokemonResults.map((pokemon) => axios.get(pokemon.url));
    // console.log(pokemonResultsPromise);

    //now we have to wait for all the promises to resolve , so we use axios.all
      const pokemonData = await axios.all(pokemonResultsPromise);
      // console.log(pokemonData);

      //now we have to map over the array of pokemons and get the data we need
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
  }, [pokedexUrl]);

  return (
    <div className="pokemonList-wrapper">
      <h3 className="listname" style={{color:"#AE445A"}}>Pokemon List</h3>
      <hr />
      <div className="pokeList">
          {(isLoading)?'Loading...' : 
          pokemonList.map((pokemon) => 
            <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} types={pokemon.types} />
          )}
      </div>
      <div className="btn">
                    <button disabled={prevUrl == null}
                    onClick={()=>setPokedexUrl(prevUrl)}
                     className="btn1">Prev</button>
                    <button disabled={nextUrl == null}
                    onClick={()=>setPokedexUrl(nextUrl)}
                    className="btn2">Next</button>
                </div>
    </div>
  );
}
export default PokemonList;
