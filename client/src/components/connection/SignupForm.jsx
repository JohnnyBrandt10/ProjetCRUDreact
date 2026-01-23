import axios from 'axios';
import React, { useState } from 'react';
import SigninForm from './SigninForm';

export default function SignupForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  //S’inscrire function et forme
  const handleRegister = async (e) => {
    e.preventDefault();
    const termsAccepted = document.getElementById('terms');
    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const controlPasswordError = document.querySelector(
      '.controlPassword.error'
    );
    const termsError = document.querySelector('.terms.error');

    controlPasswordError.textContent = '';
    termsError.textContent = '';

    if (password !== controlPassword || !termsAccepted.checked) {
      if (password !== controlPassword) {
        controlPasswordError.textContent =
          'Les mots de passe ne correspondent pas';
      }
      if (!termsAccepted.checked) {
        termsError.textContent =
          "Veuillez accepter les conditions d'utilisation";
      }
    } else {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}api/user/register`,
        withCredentials: true,
        data: { pseudo, email, password }
      })
        .then((res) => {
          if (res.data.errors) {
            pseudoError.textContent = res.data.errors.pseudo;
            emailError.textContent = res.data.errors.email;
            passwordError.textContent = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {formSubmit ? (
        <>
          <SigninForm />
          <h4 className="success">Enregistrement reussi, veuillez vous connecter</h4>
        </>
      ) : (
        <form onSubmit={handleRegister} id="sign-up-form">
          <label>Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>
          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label>Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label>Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="controlPassword error"></div>
          <br />
          <input type="checkbox" id="terms" />{' '}
          <label htmlFor="terms">
            J'accepte les{' '}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions d'utilisation
            </a>
          </label>
          <br />
          <div className="terms error"></div>
          <br />
          <input type="submit" value="S'inscrire" />
        </form>
      )}
    </div>
  );
}
