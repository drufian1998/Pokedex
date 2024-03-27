import { useContext, useState } from "react";
import { PokeballIconSmall } from "../../assets/pokeball";
import { Filters } from "../../components/Filters";
import { PokemonList } from "../../components/PokemonList";
import { PokemonContext } from "../../context/PokemonContext";
import { usePagination } from "../../hooks/usePagination";
import fondo from './fondo.jpg';
import styles from "./styles.module.css";

export const Home = () => {
  const { pokemonsFiltered } = useContext(PokemonContext);
  const { page, nextPage, previousPage, backToHome } = usePagination();

  const [visiblePokemons, setVisiblePokemons] = useState(12); 
  const loadMorePokemons = () => {
    setVisiblePokemons(prevVisiblePokemons => prevVisiblePokemons + 12);
  };

  
  const hasMorePokemons = pokemonsFiltered && visiblePokemons < pokemonsFiltered.length;

  return (
    <div className={styles.home} style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover' }}>
      <header>
        <div onClick={backToHome}>
          <PokeballIconSmall />
          <span>Pokedex</span>
        </div>
      </header>
      <Filters />
      <PokemonList
        page={page}
        perPage={visiblePokemons}
        pokemonsUrls={pokemonsFiltered}
      />
      {hasMorePokemons && ( 
        <button onClick={loadMorePokemons} className={styles.loadMoreButton}>
          Cargar más Pokemones
        </button>
      )}
    </div>
  );
};

