import React, { useEffect, useState } from 'react';
import HomeScreen from './screens/HomeScreen.jsx'
import Login from './screens/login.jsx'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase.js'
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin, handleLogout, selectUser } from './features/userSlice.js';
import ProfileScreen from './screens/profileScreen.jsx';
import Nav from './components/nav.jsx';
import Register from './screens/register.jsx';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(sessionStorage.getItem('newUser') === 'true' ? true : false);

  const handleRegisterUser = () => {
    setNewUser(true)
    sessionStorage.setItem('newUser', 'true');
  }

  const clearSessionStorage = () => {
    sessionStorage.clear();
  }

  console.log("newUser", newUser)

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //logged in
        console.log(userAuth)
        dispatch(handleLogin({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      } else {
        //logged out
        dispatch(handleLogout())
        clearSessionStorage()
      }
    })

    //this is for when its clean up, run this function. This is a google security tool
    return unSubscribe;
  }, [dispatch])

  return (
    <div className='app'>
      <Router>
        {user && !newUser ? (
          <Nav />
        ) : ""}
        <Routes>
          {user ? (
            <>
              <Route element={<ProfileScreen />} path='/profile' />
              <Route element={<HomeScreen />} path='/' />
            </>
          ) : (
            <Route element={<Login />} path='/' />
          )}
          <Route element={<Register handleRegisterUser={handleRegisterUser} />} path='/register' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// <Routes>
// <Route element={<Register />} path='/newUserRegister' />
// </Routes>