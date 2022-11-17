export class Pokemon {
    constructor(data) {
        this.name = data.name
        this.types = data.types
        this.sprites = data.sprites
        this.height = data.height
        this.weight = data.weight
        this.caught = false
    }

    static PokemonListTemplate(pokemon) {
        return `<h6 class='selectable' onclick="app.pokemonController.getOnePokemon('${pokemon.name}')">${pokemon.name}</h6>`
    }

    get ComputeCapitalLetter() {
        let lowercaseLetter = this.name[0]
        let capitalizedLetter = this.name[0].toUpperCase()
        let cappedName = this.name.replace(lowercaseLetter, capitalizedLetter)
        return cappedName
    }

    get ActivePokemonTemplate() {
        return `
         <div class="card p-3 text-center align-items-center">
              <img class="img-fluid w-25"
                src="${this.sprites.front_default}"
                alt="${this.name}" />
              <h3>${this.ComputeCapitalLetter}</h3>
              <p>Nickname: ??????</p>
              <p>Caught? ${this.caught}</p>
              <p>Height: ${this.height}</p>
              <p>Weight: ${this.weight}</p>
              <p>Type: ${this.types[0].type.name} ${this.types[1] ? ' & ' + this.types[1].type.name : ''}</p>
              <button class="btn btn-primary" onclick="app.myPokemonController.catchPokemon()">Catch Pokemon</button>
            </div>
        `
    }
}
