import axios from 'axios';
import cookie from 'js-cookie';
import React from 'react';

export default function Logout() {
  // Remove cookie
  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expire: 1 });
    }
  };

  // Logout function et forme
  const logout = async () => {
    await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_URL}api/user/logout`,
      withCredentials: true
    })
      .then(() => {
        removeCookie('jwtToken');
      })
      .catch((err) => {
        console.log(err);
      });
    window.location = '/';
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="Logout Icon" />
    </li>
  );
}
