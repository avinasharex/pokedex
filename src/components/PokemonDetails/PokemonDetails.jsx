import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PokemonDetails() {
  const {id} = useParams()
  const [pokemon,setPokemon] = useState({})
  async function downloadPokemons(){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log(response);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      type: response.data.types.map((p)=>{
      return  p.type.name
      })
    })
  }
  useEffect(()=>{
    downloadPokemons()
  },[])
  return (
    <div>
      <div>name: {pokemon.name}</div>
      <div>image: <img src={pokemon.image}/></div>
      <div>type: {pokemon.type}</div>
    </div>
  )
}

export default PokemonDetails