import { useEffect } from "react"
import axios from "axios"
import './PokemonList.css'
import { useState } from "react"
import Pokemon from "../pokemon/Pokemon"

function PokemonList(){

    const [pokemonList, setPokemonList] = useState([])
    const [isLodding, setIsLodding] = useState(true)

    async function downloadPokemons(){
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const pokemonList = response.data.results
        const pokemonPromise = pokemonList.map((pokemon)=> axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonPromise)
        // console.log(pokemonData);
        const res = (pokemonData.map((pokemonData)=>{
            const pokemon = pokemonData.data
            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types }
        }))
        // console.log(res);
        setPokemonList(res)
        setIsLodding(false)
    }
    useEffect(()=>{
        downloadPokemons()
    }, [])
    
    return <div className="pokemon-list-wraper">List Of Pokemon
    {(isLodding) ? ' Loadding...': pokemonList.map((p)=>{
       return <Pokemon name={p.name} image={p.image} key={p.id}/>
    })}</div>
}

export default PokemonList