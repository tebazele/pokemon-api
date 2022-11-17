import { appState } from "../AppState.js";
import { Pokemon } from "../Models/Pokemon.js";
import { pokemonService } from "../Services/PokemonService.js";
import { setHTML } from "../Utils/Writer.js";

function _drawPokemon() {
    let template = ''
    appState.pokemon.forEach(p => template += Pokemon.PokemonListTemplate(p))
    setHTML('pokemon-list', template)
}

function _drawActivePokemon() {
    if (!appState.activePokemon) {
        setHTML('active-pokemon', `<h3>Select a pokemon</h3>`)
    } else {
        setHTML('active-pokemon', appState.activePokemon.ActivePokemonTemplate)
    }
}

export class PokemonController {
    constructor() {
        // console.log('controller linked up');
        appState.on('activePokemon', _drawActivePokemon)
        this.getPokemon()
        _drawActivePokemon()

    }

    async getPokemon() {
        try {
            await pokemonService.getPokemon()
            _drawPokemon()
        } catch (error) {
            console.error(error)
        }
    }

    async getOnePokemon(name) {
        try {
            await pokemonService.getOnePokemon(name)
        } catch (error) {
            console.error(error)
        }
    }


}