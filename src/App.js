import React, { useState } from 'react';

import Pokemonlist from './components/Pokemonlist'
import Pokemon from './components/Pokemon'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './App.css';

const App = () => {

  const [key, setKey] = useState('list');

  return (
  <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
      <Tab eventKey="list" title="Get Character From List">
         <Pokemonlist/>
      </Tab>
      <Tab eventKey="search" title="Get Charachter By Pokemon ID">
          <Pokemon/>
      </Tab>
    </Tabs>
     
      
    
  </>
  )
};

export default App;
