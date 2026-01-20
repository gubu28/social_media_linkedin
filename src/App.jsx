import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import Login from './components/Login';
import Network from './pages/Network';
import Jobs from './pages/Jobs';
import Messaging from './pages/Messaging';
import Games from './pages/Games';
import Profile from './pages/Profile';
import Placement from './pages/Placement';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const persistedUser = localStorage.getItem('gubu_user');
    if (persistedUser) {
      dispatch(login(JSON.parse(persistedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gubu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gubu_user');
    }
  }, [user]);

  return (
    <Router>
      <div className="app">
        <Header />

        {!user ? (
          <Login />
        ) : (
          <div className="app__body_wrapper">
            <Routes>
              <Route path="/" element={
                <div className="app__body">
                  <Sidebar />
                  <Feed />
                  <Widgets />
                </div>
              } />
              <Route path="/network" element={<Network />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/messaging" element={<Messaging />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/games" element={<Games />} />
              <Route path="/placement" element={<Placement />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
