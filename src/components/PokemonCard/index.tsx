import { usePokemon } from "../../hooks/usePokemon";
import { background } from "../../utils/BackgroundsByType";
import { Link } from "react-router-dom";
import { Loader } from "../Loader";

import styles from "./styles.module.css";
import React from "react";

interface Props {
  url: string;
}

export const PokemonCard = ({ url }: Props) => {
  const { pokemon } = usePokemon(url);

  if (!pokemon || !pokemon.types) {
    return null; 
  }

 
  let combinedBackgroundColor = '';
  if (pokemon.types.length === 1) {
    combinedBackgroundColor = background[pokemon.types[0].type.name];
  } else {
    combinedBackgroundColor = `linear-gradient(to bottom, ${pokemon.types.map(type => background[type.type.name]).join(",")})`;
  }

 
  const types = pokemon.types.map((type, index) => (
    <React.Fragment key={index}>
      <span>{type.type.name}</span>
      {index < pokemon.types.length - 1 && ' '} 
    </React.Fragment>
  ));

  return (
    <Link to={`/${pokemon.id}`} className={styles.pokeCard} style={{ background: combinedBackgroundColor }}>
      <div className={styles.top}>
        {pokemon.sprites?.other?.dream_world?.front_default ||
        pokemon.sprites?.front_default ? (
          <img
            src={
              pokemon.sprites?.other?.dream_world?.front_default ||
              pokemon.sprites?.front_default
            }
            alt={pokemon.name}
          />
        ) : (
          <div className={styles.loadingContainer}>
            <Loader color={""} />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.pokecard}>
          <div>
            <span>N.º{pokemon.id}</span>
          </div>
          <div>{pokemon.name}</div>
          <div>{types}</div>
        </div>
      </div>
    </Link>
  );
};

