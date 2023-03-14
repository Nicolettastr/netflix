import React from 'react';
import HomeScreen from './screens/HomeScreen.jsx'
import Login from './screens/login.jsx'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const user = "nicole";

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route element={<HomeScreen />} path='/' />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
