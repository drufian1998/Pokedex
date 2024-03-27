import { IPokemon } from "../../interfaces/interfaces";
import { background } from "../../utils/BackgroundsByType";
import { Loader } from "../Loader";
import { BaseStats } from "./components/BaseStats";
import { Header } from "./components/Header";
import { PokeTypes } from "./components/PokeTypes";
import { Stats } from "./components/Stats";
import { Title } from "./components/Title";

import styles from "./styles.module.css";

interface Props {
  pokemon: IPokemon | null;
}

export const PokemonDetail = ({ pokemon }: Props) => {
  if (!pokemon) {
    return (
      <div className={styles.loadingContainer}>
        <Loader size={50} color="fff" />
      </div>
    );
  }

  let backgroundSelected = '';
  if (pokemon.types.length === 1) {
    backgroundSelected = background[pokemon.types[0].type.name];
  } else {
    backgroundSelected = `linear-gradient(to bottom, ${pokemon.types.map(type => background[type.type.name]).join(",")})`;
  }

  return (
    <div style={{ background: backgroundSelected }} className={styles.bg}>
      <Header pokemon={pokemon} />
      <div className={styles.info}>
        <img
          src={
            pokemon?.sprites?.other?.dream_world?.front_default ||
            pokemon?.sprites?.front_default
          }
          alt={pokemon?.name}
        />
        <PokeTypes pokemon={pokemon} />
        <Title content="About" backgroundSelected={backgroundSelected} />
        <Stats pokemon={pokemon} />
        <Title content="Base Stats" backgroundSelected={backgroundSelected} />
        <BaseStats pokemon={pokemon} backgroundSelected={backgroundSelected} />
      </div>
    </div>
  );
};

