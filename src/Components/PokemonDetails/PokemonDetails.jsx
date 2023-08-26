import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react';
import './PokemonDetails.css'

const PokemonDetails = () => {

    const {id} = useParams();
    const [pokemon, setPokemon] = React.useState([]);

    async function getPokemonDetails() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            type: response.data.types.map((type) => type.type.name)
        })


    }
useEffect(() => {
    getPokemonDetails();
}, [])

  return (
    <div className='pokemon-details'>
        <div className="pokemon-image"><img src={pokemon.image} alt="" /></div>
        <div className="pokemon-name"> <span>{pokemon.name}</span></div>
        <div className="pokemon-weight">Weight: {pokemon.weight}</div>
        <div className="pokemon-height">Height: {pokemon.height}</div>
        <div className="pokemon-types"> {pokemon.type}</div>
    </div>
  )
}

export default PokemonDetails
