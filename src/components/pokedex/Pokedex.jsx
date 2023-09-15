import { useState } from "react"
import PokemonList from "../pokemonList/pokemonList"
import Search from "../search/search"

import './Pokedex.css'
function Pokedex(){
    const [searchTerm,setSearchTerm] = useState('')
    return (
        <div className="pokedex-wraper">
        <h1 className="pokedex-heading">Pokedex</h1>
        <Search updateSearchTerm={setSearchTerm}></Search>
        {searchTerm}
        { (searchTerm.length === 0) ? <PokemonList></PokemonList> : ''}
        </div>
    )
}

export default Pokedex