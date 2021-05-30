import React, { Component } from "react";
import Home from './Component/Home';
import {Route} from 'react-router-dom';

class App extends Component {
  render(){
    return <div>

      <Route path='/'  component ={Home}/>    
    </div>
       
  }
}

export default App;
