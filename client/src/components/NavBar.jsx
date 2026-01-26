import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './AppContext';
import Logout from './connection/Logout';
import { useSelector } from 'react-redux';

export default function NavBar() {
  // Bare navigation et forme
  const uid = useContext(UserContext);
  const userData = useSelector(state => state.user.user)

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="Logo QLQPRO" />
              <h3>EA</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profile">
                <h5>Bienvenue {userData?.pseudo}</h5>
              </NavLink>
            </li>
            <Logout/>
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profile">
                <img src="./img/icons/login.svg" alt="Login Icon" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
