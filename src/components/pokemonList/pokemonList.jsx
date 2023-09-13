import { useEffect } from "react"
import axios from "axios"
import './PokemonList.css'
import { useState } from "react"
import Pokemon from "../pokemon/Pokemon"

function PokemonList() {

    // const [pokemonList, setPokemonList] = useState([])
    // const [isLodding, setIsLodding] = useState(true)
    // const [pokedexUrl,setPokedexUrl] = useState()
    // const [nextUrl,setNextUrl] = useState('')
    // const [prevUrl,setPrevUrl] = useState('')

    const [pokemonListState, setPokemonListState] = useState({
        isLodding: true,
        pokemonList: [],
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    })
    async function downloadPokemons() {
        setPokemonListState({ ...pokemonListState, isLodding: true })
        const response = await axios.get(pokemonListState.pokedexUrl)
        const pokemonList = response.data.results
        setPokemonListState((state) => (
            {
                ...state, nextUrl: response.data.next,
                prevUrl: response.data.previous
            }
        ))
        const pokemonPromise = pokemonList.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonPromise)
        const res = (pokemonData.map((pokemonData) => {
            const pokemon = pokemonData.data
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        }))
        // console.log(res);
        // setPokemonList(res)
        // setIsLodding(false)
        setPokemonListState((state) => (
            {
                ...state, pokemonList: res,
                isLodding: false
            }))
        }
    useEffect(() => {
        downloadPokemons()
    }, [pokemonListState.pokedexUrl])

    return <div className="pokemon-list-wraper">
        <div className="pokemon-wraper"> {(pokemonListState.isLodding) ? ' Loadding...' : pokemonListState.pokemonList.map((p) => {
            return <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
        })}</div>
        <div className="controls">
            <button disabled={pokemonListState.prevUrl === null} onClick={() => {
                setPokemonListState((state) => (
                    {
                        ...state, pokedexUrl: pokemonListState.prevUrl
                    }
                ))
            }}>Prev</button>
            <button disabled={pokemonListState.nextUrl === null} onClick={() => {
                       setPokemonListState((state) => (
                        {
                            ...state, pokedexUrl: pokemonListState.nextUrl
                        }
                    ))

            }}>Next</button>
        </div>
    </div>
}

export default PokemonList