import React from 'react';

var PokemonEntry = (props) => {
  return (
    <div>
      <h3>
        {props.item.name}
      </h3>
      <img src={props.item.img}></img>
      <div>Type: {props.item.type}</div>
    </div>
  )
}

export default PokemonEntry;