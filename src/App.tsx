import React, { useEffect, useState } from "react";
import "./App.css";
import { getPokemon, getInforPokemonByName } from "./api/index";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon, Pokemons, Detail } from "./interface";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("pokemon?limit=20&offset=10");
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });
  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const response = await getPokemon(nextUrl);
      if (response.status === 200) {
        const { results, next } = response.data;

        setNextUrl(next.split("v2/")[1]);
        const newResult = results.map(async (pokemon: Pokemons) => {
          const infoPoke = await getInfoPokemonByName(pokemon.name);
          return infoPoke;
        });

        Promise.all(newResult).then((res: any) => {
          setPokemons((p) => [...p, ...res]);
        });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getInfoPokemonByName = async (name: string) => {
    try {
      const response = await getInforPokemonByName(name);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const clickNextUrl = () => {
    setLoading(true);
    getPokemons();
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button
              onClick={() => {
                clickNextUrl();
              }}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
