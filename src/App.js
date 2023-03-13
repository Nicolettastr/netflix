import React from 'react';
import HomeScreen from './components/HomeScreen.jsx'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
