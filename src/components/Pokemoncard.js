import React from 'react';

const Pokemoncard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <div className="sprites">
        <h3>Sprites:</h3>
        <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} width="100" />
        <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} width="100" />
        <img src={pokemon.sprites.other['official-artwork'].front_default} alt={`${pokemon.name} official artwork`} width="150" />
      </div>

      <div className="moves">
        <h3>Moves:</h3>
        <ul>
          {pokemon.moves.slice(0, 3).map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Pokemoncard;
