import './Search.css'
function Search({updateSearchTerm}){

   
    return (
        <div className="search-wraper">
        <input id="pokemon-input-wraper" type="text" placeholder="Pokemon name..."
        onChange={(e)=>updateSearchTerm(e.target.value)}
        />
        </div>
    )
}

export default Search