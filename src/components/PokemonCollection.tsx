import React from "react";
import { Detail, Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setViewDetail({
        id,
        isOpened: true,
      });
    }
  };
  return (
    
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? <div className="overlay"></div> : <div></div>}
        {pokemons.map((pokemon) => {
          return (
            <div
              onClick={() => {
                selectPokemon(pokemon.id);
              }}
            >
              {
                <PokemonList
                  viewDetail={viewDetail}
                  setViewDetail={setViewDetail}
                  name={pokemon.name}
                  key={pokemon.id}
                  id={pokemon.id}
                  abilities={pokemon.abilities}
                  image={pokemon.sprites.front_default}
                />
              }
            </div>
          );
        })}
      </section>
    
  );
};

export default PokemonCollection;
