import React from 'react'
import Search from '../Search/Search.jsx';
import './Pokedex.css'
import PokemonList from '../PokemonList/PokemonList.jsx';
function Pokedex()
{
    return(
        <>
                <h1 className='pokename'>Pokemon</h1>
                <Search />
                <PokemonList />
                
        </>
    ) 
}
export default Pokedex;