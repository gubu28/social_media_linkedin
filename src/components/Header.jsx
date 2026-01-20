import React from 'react';
import './Header.css';
import { Search, Home, Users, Briefcase, MessageSquare, Bell, User, LogOut, Gamepad2, GraduationCap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { selectUnreadCount } from '../features/notificationSlice';
import { Link, NavLink } from 'react-router-dom';

function Header() {
    const user = useSelector(selectUser);
    const unreadCount = useSelector(selectUnreadCount);
    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
    };

    return (
        <div className="header">
            <div className="header__left">
                <div className="header__logo">
                    <Link to="/">
                        <h2>Gubu</h2>
                    </Link>
                </div>
                <div className="header__search">
                    <Search className="header__icon" size={18} />
                    <input type="text" placeholder="Search" />
                </div>
            </div>

            <div className="header__right">
                {user ? (
                    <>
                        <NavLink to="/" className={({ isActive }) => isActive ? "headerOption headerOption--active" : "headerOption"}>
                            <Home size={24} />
                            <span>Home</span>
                        </NavLink>
                        <NavLink to="/network" className={({ isActive }) => isActive ? "headerOption headerOption--active" : "headerOption"}>
                            <Users size={24} />
                            <span>Network</span>
                        </NavLink>
                        <NavLink to="/jobs" className={({ isActive }) => isActive ? "headerOption headerOption--active" : "headerOption"}>
                            <Briefcase size={24} />
                            <span>Jobs</span>
                        </NavLink>
                        <NavLink to="/messaging" className={({ isActive }) => isActive ? "headerOption headerOption--active" : "headerOption"}>
                            <MessageSquare size={24} />
                            <span>Messaging</span>
                        </NavLink>
                        <NavLink to="/games" className={({ isActive }) => isActive ? "headerOption headerOption--active" : "headerOption"}>
                            <Gamepad2 size={24} />
                            <span>Games</span>
                        </NavLink>
                        <NavLink to="/placement" className={({ isActive }) => isActive ? "headerOption headerOption--active" : "headerOption"}>
                            <GraduationCap size={24} />
                            <span>Placement</span>
                        </NavLink>
                        <NavLink to="/notifications" className={({ isActive }) => isActive ? "headerOption headerOption--active" : "headerOption"}>
                            <div className="headerOption__iconWrapper">
                                <Bell size={24} />
                                {unreadCount > 0 && <span className="headerOption__badge">{unreadCount}</span>}
                            </div>
                            <span>Notifications</span>
                        </NavLink>
                        <div className="headerOption" onClick={logoutOfApp}>
                            <div className="header__avatar">
                                {user?.photoUrl ? <img src={user.photoUrl} alt="" /> : <User size={24} />}
                            </div>
                            <span>Me (Logout)</span>
                        </div>
                    </>
                ) : (
                    <div className="headerOption" onClick={() => window.location.reload()}>
                        <User size={24} />
                        <span>Sign In</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
