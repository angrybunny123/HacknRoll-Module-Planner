import React, {Component} from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Button } from '@material-ui/core';
import axios from './axios.js';

import Board from './components/Board';
import Card from './components/Card';
import Module from './components/Module/Module';
import ModuleContainer from "./components/ModuleContainer/ModuleContainer";

class App extends Component {

  axiosTestPostRequest = () => { 
    const module = { 
      credits: 4, 
      name: "GES1035",
      prerequisites: ["GEQ1000","GER1000"]
    }
    axios.post('/modulePost.json', module).then(response => console.log(response)).catch(error => console.log(error));
  }

  axiosTestGetRequest = () => { 
    axios.get('modulePost.json').then(response => console.log(response)).catch(error => console.log(error));
  }
  render() {
    return (
    <div className="App">
      <ModuleContainer />
      <main className="flexbox">
      <Board id="board-1" className="board">
        <Card id="card-1" className="card" draggable="true">
          <Module moduleCode="CS1231"/>
        </Card>
      </Board>
      <Board id="board-2" className="board">
        <Card id="card-2" className="card" draggable="true">
          <p>card two</p>
        </Card>
      </Board>
      <Board id="board-3" className="board">
        <Card id="card-3" className="card" draggable="true">
          <p>card three</p>
        </Card>
      </Board>
      <Board id="board-4" className="board">
        <Card id="card-4" className="card" draggable="true">
          <p>card four</p>
        </Card>
      </Board>

      </main>
    </div>
    );
  }
}

export default App;
