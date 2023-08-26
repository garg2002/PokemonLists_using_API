import React from 'react'
import './Pokemon.css'
const Pokemon = ({name,image}) => {
  return (

     <>
      <div className='pokemon'>
        <h3 className='pokelists'>{name}</h3>
        <img src={image} alt='' className='img' />
      </div>
     
     </>


  )
}

export default Pokemon;
