import axios from 'axios';
import React, { useState } from 'react';

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_URL}api/user/login`,
      withCredentials: true,
      data: { email, password }
    })
      .then((res) => {
        if (res.data.errors) {
          // Recupere les erreurs
          document.querySelector('.email.error').innerHTML =
            res.data.errors.email;
          document.querySelector('.password.error').innerHTML =
            res.data.errors.password;
        } else {
          window.location = '/';
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          // Affiche les erreurs dans le formulaire
          document.querySelector('.email.error').innerHTML =
            err.response.data.errors.email;
          document.querySelector('.password.error').innerHTML =
            err.response.data.errors.password;
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleLogin} id="signinForm">
        <label>Email</label>
        <br />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="email error"></div>

        <br />

        <label>Mot de passe</label>
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="password error"></div>

        <br />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
}
