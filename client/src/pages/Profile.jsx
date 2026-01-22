import React, { useContext } from 'react';
import Login from '../components/connection/Login';
import { UserContext } from '../components/AppContext';

export default function Profile() {
  const uid = useContext(UserContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h1>Update page</h1>
      ) : (
        <div className="log-container">
          <Login signin={true} signup={false} />
          <div className="img-container">
            <img src="./img/log.svg" alt="Login image" />
          </div>
        </div>
      )}
    </div>
  );
}
