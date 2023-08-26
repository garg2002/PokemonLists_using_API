import './App.css'
import React from 'react'
import CustomRoutes from './routes/customRoutes'
import { Link } from 'react-router-dom'
function App() {
  return (
    <>
    <h1 className='pokename'>
      <Link style={{color:"#fff", textDecoration: 'none'}} to='/'>Pokedex</Link>
    </h1>

      <CustomRoutes />

    </>
  )
}

export default App
