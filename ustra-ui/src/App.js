import React, { Component } from "react";
import Home from './Component/Home';
import { Route } from 'react-router-dom';


class App extends Component {

  render() {
    return <div onClick={(e) => {

      let input = document.querySelector('.dd-input')
      if (input !== null) {
          if (input.checked === true) {
            input.checked = false
          }
          else if (e.target.id === 'test' || e.target.id === 'test1') {
            if (input.checked === false)
              input.checked = true
          }
      }

    }}>
      <Route path='/' component={Home} />
    </div>

  }
}

export default App;
