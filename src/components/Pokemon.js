
import React,{useEffect, useState} from 'react'
import Pokemoncard from './Pokemoncard'

function Pokemon(){

  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pokemonId, setpokemonId] = useState(1);
  const [errMsg, seterrMsg] = useState(null);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if(!response.ok){
          throw new Error ('Failed to get Data')
      }

      const dataRes = await response.json()
      setPokemonData(dataRes);
      setLoading(false);
      seterrMsg(null)
    } catch (error) {
      setLoading(false);
      seterrMsg('Error fetching Pokemon data', error)
    }
  }

  useEffect(() => {
    fetchPokemonData();
  }, []);

 
  if (!pokemonData) {
    return <div>No Pokemon data available.</div>;
  }

  const handleChange = (e) =>{
    setpokemonId(e.target.value)
  }

  const getPokemonInfo = () =>{
    if(pokemonId.length < 1){
        return 
    }

    fetchPokemonData()
  }


  return (
    <>
    <div className="get-pokemon-form">
         <h2>Get Pokemon Info</h2>
        <div className="div-region">
            <input type="text" value={pokemonId} onChange={handleChange}/>
        </div>
        <div className="div-region">
            <button onClick={getPokemonInfo} className="button">Get Info</button>
        </div>
        <div className="err-region">
          {errMsg}
        </div>
    </div>
   
    {

        !errMsg?
            !loading  ?
            <div className="App"><Pokemoncard pokemon={pokemonData} /></div> : 
             <div className="App">Loading...</div>
        : null
   } 
    </>
  );
}

export default Pokemon