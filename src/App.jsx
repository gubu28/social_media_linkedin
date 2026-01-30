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
import Notifications from './pages/Notifications';
import Toast from './components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Register from './components/Register';
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
        <Toast />

        <div className="app__body_wrapper">
          <Routes>
            {/* Authenticated Routes */}
            <Route path="/" element={
              user ? (
                <div className="app__body">
                  <Sidebar />
                  <Feed />
                  <Widgets />
                </div>
              ) : <Navigate to="/login" />
            } />
            <Route path="/network" element={user ? <Network /> : <Navigate to="/login" />} />
            <Route path="/jobs" element={user ? <Jobs /> : <Navigate to="/login" />} />
            <Route path="/messaging" element={user ? <Messaging /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/games" element={user ? <Games /> : <Navigate to="/login" />} />
            <Route path="/placement" element={user ? <Placement /> : <Navigate to="/login" />} />
            <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />

            {/* Public Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
