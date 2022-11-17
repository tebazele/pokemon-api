import { MyPokemonController } from "./Controllers/MyPokemonController.js";
import { PokemonController } from "./Controllers/PokemonController.js";


class App {
  pokemonController = new PokemonController()

  myPokemonController = new MyPokemonController()
}

window["app"] = new App();
