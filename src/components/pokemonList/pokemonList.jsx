import { useEffect } from "react"
import axios from "axios"
import './PokemonList.css'
import { useState } from "react"
import Pokemon from "../pokemon/Pokemon"

function PokemonList(){

    const [pokemonList, setPokemonList] = useState([])
    const [isLodding, setIsLodding] = useState(true)
    const [pokedexUrl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [nextUrl,setNextUrl] = useState('')
    const [prevUrl,setPrevUrl] = useState('')
    async function downloadPokemons(){
        const response = await axios.get(pokedexUrl)
        const pokemonList = response.data.results
        console.log(response.data);
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
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
    }, [pokedexUrl])
    
    return <div className="pokemon-list-wraper">
    <div className="pokemon-wraper"> {(isLodding) ? ' Loadding...': pokemonList.map((p)=>{
       return <Pokemon name={p.name} image={p.image} key={p.id}/>
    })}</div>
    <div className="controls">
        <button disabled={prevUrl === null} onClick={()=>{
            setPokedexUrl(prevUrl)
        }}>Prev</button>
        <button disabled={nextUrl === null} onClick={()=>{
            setPokedexUrl(nextUrl)
        }}>Next</button>
    </div>
   </div>
}

export default PokemonList