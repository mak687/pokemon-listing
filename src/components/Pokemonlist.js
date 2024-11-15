
import React,{useEffect, useState} from 'react'
import Pokemoncard from './Pokemoncard'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Pokemonlist(){

    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
  
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState('');
    const handleClose = () => setShow(false);
  
    const fetchPokemonData = async () => {
        try {
          // Fetch data from the PokéAPI
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
          if(!response.ok){
              throw new Error ('Failed to get Data')
          }
    
          const dataRes = await response.json()
          console.log(dataRes.results)
           setPokemonList(dataRes.results);
           
        } catch (error) {
          console.log('Error fetching Pokemon data', error)
        }
      }
   
      useEffect(() => {
        fetchPokemonData();
      }, []);
    
      const handleSelectPokemon = async (url) => {
        setLoading('Loading...')
        // Fetch detailed data for the selected Pokémon
        const response = await fetch(url);
        if(!response.ok){
            throw new Error ('Failed to get Data')
        }

        const dataRes = await response.json()
        setSelectedPokemon(dataRes);
        setShow(true)
        setLoading('')
      };

  
    return (
      <div className="App">
        <h1>Select a Pokemon</h1>
        <div>

        <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemonList.map((pokemon, index) => (
                        <tr>
                            <td > {pokemon.name}</td>
                            <td>
                                <Button variant="info" onClick={() => handleSelectPokemon(pokemon.url)}> {pokemon.name}</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
          
        </div>

        {selectedPokemon ? <Offcanvas show={show} onHide={handleClose} placement="left">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>{selectedPokemon.name.toUpperCase()}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {<Pokemoncard pokemon={selectedPokemon} />}
            </Offcanvas.Body>
        </Offcanvas>
        : loading}
      </div>
    );
}

export default Pokemonlist