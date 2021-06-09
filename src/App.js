import React, {Component} from 'react';

import { Route, BrowserRouter } from 'react-router-dom';

import Map from './components/Map/Map';

class App extends Component {

  render () {

    return (
      <>
        <BrowserRouter>

          <Route exact path="/" component={Map} />
          
        </BrowserRouter>
      </>
    )
  }  
}

export default App;