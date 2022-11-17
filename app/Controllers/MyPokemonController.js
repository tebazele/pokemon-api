import { appState } from "../AppState.js";
import { MyPokemon } from "../Models/MyPokemon.js";
import { myPokemonService } from "../Services/MyPokemonService.js";
import { pokemonService } from "../Services/PokemonService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawMyPokemon() {
    // console.log(appState.myPokemon[0])
    let template = ''
    appState.myPokemon.forEach(p => template += p.MyPokemonListTemplate)
    setHTML('my-pokemon-list', template)

}

function _drawMyActivePokemon() {

    let mon = appState.myActivePokemon
    if (!mon) {
        setHTML('active-pokemon', `<h3>Select a pokemon</h3>`)
    } else {
        setHTML('active-pokemon', mon.MyActivePokemonTemplate)
    }
}

export class MyPokemonController {
    constructor() {
        console.log('my pokemon controller linked up');
        appState.on('myPokemon', _drawMyPokemon)
        appState.on('myActivePokemon', _drawMyActivePokemon)
        this.showMyPokemon()
    }

    async catchPokemon() {
        let value = await Pop.prompt('give your pokemon a nickname')
        if (value) {
            console.log(value);
            await myPokemonService.catchPokemon(value)
            Pop.toast('pokemon added to your list!', 'success')

            // _drawMyPokemon()
        }
    }

    async showMyPokemon() {
        await myPokemonService.showMyPokemon()
        // _drawMyPokemon()
    }

    setMyActivePokemon(id) {
        myPokemonService.setMyActivePokemon(id)
    }

    async removePokemon() {
        try {
            await myPokemonService.removePokemon()
            Pop.toast('Pokemon deleted', 'success')

        } catch (error) {
            console.error(error)
        }
    }

}