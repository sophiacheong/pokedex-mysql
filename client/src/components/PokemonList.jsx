import React from 'react';
import PokemonEntry from './PokemonEntry.jsx';

var PokemonList = (props) => {
  return (
    <div>
      {props.pokemon.map((item, index) => {
        return (
        <PokemonEntry item={item} key={index} name={props.name} getAll={props.getAll} />
        )
      })}
    </div>
  )
}

export default PokemonList