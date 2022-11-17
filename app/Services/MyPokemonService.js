import { appState } from "../AppState.js"
import { MyPokemon } from "../Models/MyPokemon.js"

// @ts-ignore
const myPokemonApi = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/jeanne/pokemon'
})
class MyPokemonService {
    async removePokemon() {
        try {
            let currentPokemon = appState.myActivePokemon
            let response = await myPokemonApi.delete(currentPokemon.id)
            console.log('deleted pokemon', response.data);
            appState.myPokemon = appState.myPokemon.filter(p => p.id != currentPokemon.id)
            appState.myActivePokemon = null

        } catch (error) {
            console.error(error)
        }

    }

    async catchPokemon(value) {
        let caughtPokemon = appState.activePokemon
        // @ts-ignore
        let formattedPokemon = new MyPokemon(caughtPokemon, caughtPokemon.name, caughtPokemon.sprites.front_default, caughtPokemon.weight, caughtPokemon.height, caughtPokemon.types, value)
        // console.log(formattedPokemon);
        let response = await myPokemonApi.post('', formattedPokemon)
        // console.log('Caught Pokemon', response.data);
        appState.myPokemon.push(formattedPokemon)
        appState.myActivePokemon = formattedPokemon
        // console.log(appState.myPokemon)
        this.showMyPokemon()
    }
    async showMyPokemon() {
        let response = await myPokemonApi.get()
        console.log('getting MY pokemon', response.data)
        // data, name, img, weight, height, types, nickname
        appState.myPokemon = response.data.map(p => new MyPokemon(p, p.name, p.img, p.weight, p.height, p.types, p.nickName))
        console.log(appState.myPokemon);
        appState.myPokemon = [...appState.myPokemon,]
    }
    setMyActivePokemon(id) {
        let foundPokemon = appState.myPokemon.find(p => p.id == id)
        appState.myActivePokemon = foundPokemon
    }

}
export const myPokemonService = new MyPokemonService()