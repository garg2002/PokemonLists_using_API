import React from 'react'
import './Pokemon.css'
import { Link } from 'react-router-dom';
const Pokemon = ({name,image,id}) => {
  return (

     <>
      <div className='pokemon'>
       <Link className='Link' to={`/pokemon/${id}`}>
       <h3 className='pokelists'>{name}</h3>
        <img src={image} alt='' className='img' />
        </Link>
      </div>
     
     </>


  )
}

export default Pokemon;
