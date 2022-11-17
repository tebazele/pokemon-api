import { Pokemon } from "./Pokemon.js";


export class MyPokemon extends Pokemon {
    constructor(data, name, img, weight, height, types, nickname) {
        super(data);
        this.name = name
        this.img = img
        this.weight = weight
        this.height = height
        this.types = types
        this.nickName = nickname
        this.id = data.id
        this.caught = true
    }

    get MyPokemonListTemplate() {
        return `
        <h6 class='selectable' onclick="app.myPokemonController.setMyActivePokemon('${this.id}')">${this.ComputeCapitalLetter}<span>, Aka, "${this.nickName}"</span></h6>       
        <p>Caught: ${this.caught}! Nice catch</p>
        `
    }

    get MyActivePokemonTemplate() {
        return `
        <div class="card p-3 text-center align-items-center">
              <img class="img-fluid w-25"
                src="${this.img}"
                alt="${this.name}" />
              <h3>${this.ComputeCapitalLetter}</h3>
              <p>Nickname: ${this.nickName}</p>
              <p>Height: ${this.height}</p>
              <p>Weight: ${this.weight}</p>
              <p>Type: ${this.types[0].type.name} ${this.types[1] ? ' & ' + this.types[1].type.name : ''}</p>
              <button class="btn btn-danger" onclick="app.myPokemonController.removePokemon()">Delete Pokemon</button>
            </div>
        `
    }
}