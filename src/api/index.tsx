import axios from "axios";

const defaultURL: string = "https://pokeapi.co/api/v2/";

export const getPokemon = (url: string) => {
  return axios.get(defaultURL + url);
};

export const getInforPokemonByName = (name: string) => {
  const urlGetInfoPokemonByName: string = `pokemon/${name}`;
  return axios.get(defaultURL + urlGetInfoPokemonByName);
};
