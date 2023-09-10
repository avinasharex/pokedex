import PokemonList from "../pokemonList/pokemonList"
import Search from "../search/search"

import './Pokedex.css'
function Pokedex(){
    return (
        <div className="pokedex-wraper">
        <h1 className="pokedex-heading">Pokedex</h1>
        <Search></Search>
        <PokemonList></PokemonList>
        </div>
    )
}

export default Pokedex