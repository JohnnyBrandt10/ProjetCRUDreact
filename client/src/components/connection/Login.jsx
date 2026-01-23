import React, { useState } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

export default function Login(props) {
  const [signinModal, setSigninModal] = useState(props.signin);
  const [signupModal, setSignupModal] = useState(props.signup);

  //Button active function et forme
  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSigninModal(false);
      setSignupModal(true);
    } else if (e.target.id === 'login') {
      setSigninModal(true);
      setSignupModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signupModal ? 'active-btn' : null}
          >
            S’inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signinModal ? 'active-btn' : null}
          >
            Se connecter
          </li>
        </ul>
        {signinModal && <SigninForm />}
        {signupModal && <SignupForm />}
      </div>
    </div>
  );
}
