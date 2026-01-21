import axios from 'axios'
import React, { useState } from 'react';

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault()
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}api/user/login`,
        withCredentials: true,
        data: {
            email,
            password
        }
    })
  };

  return (
    <div>
      <form action="" onSubmit={handleLogin} id="signinForm">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="email error"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
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
