
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  // /** @type {import('./Models/Value').Value[]} */
  // values = loadState('values', [Value])
  /** @type {import('./Models/Pokemon.js').Pokemon[]} */
  pokemon = []

  /** @type {import('./Models/Pokemon.js').Pokemon | null | undefined} */
  activePokemon = null

  /** @type {import('./Models/MyPokemon.js').MyPokemon[]} */
  myPokemon = []

  /** @type {import('./Models/MyPokemon.js').MyPokemon | null | undefined} */
  myActivePokemon = null
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
