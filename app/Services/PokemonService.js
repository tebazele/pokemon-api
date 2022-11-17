import { appState } from "../AppState.js"
import { Pokemon } from "../Models/Pokemon.js"

// @ts-ignore
const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})
class PokemonService {
    async getPokemon() {
        try {
            // console.log('getting pokemon')
            const response = await pokemonApi.get()
            // NOTE these data come in as objects with keys [name] [url]

            // console.log('pokemon data', response.data.results);
            appState.pokemon = response.data.results
            // console.log(appState.pokemon);
        } catch (error) {
            console.error(error)
        }
    }

    async getOnePokemon(name) {
        // console.log('got one pokemon', name);
        let response = await pokemonApi.get(name)
        console.log('pokemon object', response.data);
        appState.activePokemon = new Pokemon(response.data)
        console.log(appState.activePokemon);

    }

}

export const pokemonService = new PokemonService()