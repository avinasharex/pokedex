import './PokemonList.css'
import Pokemon from "../pokemon/Pokemon"
import usePokemon from "../hooks/usePokemon"

function PokemonList() {

    const [pokemonListState,setPokemonListState] = usePokemon('https://pokeapi.co/api/v2/pokemon', false)

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