import React from 'react'
import { Routes , Route} from 'react-router-dom'  
import Pokedex from '../Components/Pokedex/Pokedex'  
import PokemonDetails from '../Components/PokemonDetails/PokemonDetails'
const customRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  )
}

export default customRoutes;
