import React, { useContext } from 'react';
import Login from '../components/connection/Login';
import { UserContext } from '../components/AppContext';
import UpdateProfile from '../components/Profile/UpdateProfile';

export default function Profile() {
  const uid = useContext(UserContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfile/>
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
