import { Link } from 'react-router-dom'
import './Pokemon.css'
function Pokemon({name,image,id}) {
  return (
    <Link to={`/pokemon/${id}`}>
    <div className="pokemon">
    <div>{name}</div>
    <div><img src={image} /></div>
    </div>
    </Link>
  )
}

export default Pokemon