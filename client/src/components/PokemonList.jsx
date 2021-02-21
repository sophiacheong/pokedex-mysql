import React from 'react';
import PokemonEntry from './PokemonEntry.jsx';

var PokemonList = (props) => {
  return (
    <div>
      {props.pokemon.map((item, index) => {
        return (
        <PokemonEntry item={item} key={index} />
        )
      })}
    </div>
  )
}

export default PokemonList