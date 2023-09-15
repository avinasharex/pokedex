import axios from 'axios'
import { useEffect, useState } from 'react'

function usePokemon(url, type) {
    // const [pokemonList, setPokemonList] = useState([])
    // const [isLodding, setIsLodding] = useState(true)
    // const [pokedexUrl,setPokedexUrl] = useState()
    // const [nextUrl,setNextUrl] = useState('')
    // const [prevUrl,setPrevUrl] = useState('')

    const [pokemonListState, setPokemonListState] = useState({
        isLodding: true,
        pokemonList: [],
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: ''
    })

    async function downloadPokemons() {
        setPokemonListState({ ...pokemonListState, isLodding: true })
        const response = await axios.get(pokemonListState.pokedexUrl)
        const pokemonResults = response.data.results
        setPokemonListState((state) => (
            {
                ...state, nextUrl: response.data.next,
                prevUrl: response.data.previous
            }
        ))
        if (type) {
            setPokemonListState((state) => ({
                ...state,
                pokemonList: response.data.pokemon.slice(0, 5),
            }))
        } else {
            const pokemonPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
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
        }
        
        useEffect(() => {
        downloadPokemons()
    }, [pokemonListState.pokedexUrl])
    return [pokemonListState, setPokemonListState]
}

export default usePokemon