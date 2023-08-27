import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
const usePokemonList = () => {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
        nextUrl: "",
        prevUrl: "",
      });

      async function fetchPokemon() {
        setPokemonListState({ ...pokemonListState, isLoading: true });
        //this downloads list of 20 pokemons
        const res = await axios.get(pokemonListState.pokedexUrl);
        // console.log(res);
    
        //here we get the array of pokemons from res.data.results
        const pokemonResults = res.data.results;
        console.log(pokemonResults);
    
        setPokemonListState((State) => ({
          ...State,
          nextUrl: res.data.next,
          prevUrl: res.data.previous,
        }));
    
        //now iterating over the array of pokemons and fetching data for each pokemon by using their url , and create array of promises that will download those 20 pokemons
        const pokemonResultsPromise = pokemonResults.map((pokemon) =>
          axios.get(pokemon.url)
        );
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
            image: pokemon.sprites.other
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.front_shinny,
            types: pokemon.types,
          };
        });
        //  console.log(result);
        setPokemonListState((State) => ({
          ...State,
          pokemonList: result,
          isLoading: false,
        }));
      }


      useEffect(() => {
        fetchPokemon();
      }, [pokemonListState.pokedexUrl]);



  return [pokemonListState, setPokemonListState]
}

export default usePokemonList
