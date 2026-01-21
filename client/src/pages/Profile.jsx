import React from 'react';
import Login from '../components/connection/Login';

export default function Profile() {
  return (
    <div className="profil-page">
      <div className="log-container">
        <Login signin={false} signup={true} />
        <div className="img-container">
          <img src="./img/log.svg" alt="Login image" />
        </div>
      </div>
    </div>
  );
}
