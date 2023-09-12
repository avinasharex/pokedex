import { Route, Routes } from "react-router-dom"
import Pokedex from "../components/pokedex/Pokedex"
import PokemonDetails from "../components/PokemonDetails/PokemonDetails"


function CustomRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Pokedex></Pokedex>}/>
        <Route path="/pokemon/:id" element={<PokemonDetails></PokemonDetails>}/>
    </Routes>
  )
}

export default CustomRoutes