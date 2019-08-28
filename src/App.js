import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from '../src/routes/home';
import Days from './routes/daysforecast';
import MapForecast from './routes/mapforecast';
import Hours from './routes/hourly';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/daysforecast" component={Days} />
        <Route exact path="/mapforecast" component={MapForecast} />
        <Route exact path="/hourly" component={Hours} />
      </Router>
    );
  }
}

export default App;
