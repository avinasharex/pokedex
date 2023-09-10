
function Pokemon({name,image}) {
  return (
    <>
    <div>{name}</div>
    <div><img src={image} /></div>
    </>
  )
}

export default Pokemon