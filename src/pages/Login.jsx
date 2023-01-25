import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [login, setLogin] = useState({ email: '', password: '' }); // email n password
  const [validLogin, setValidLogin] = useState(false);

  useMemo(() => { // check login
    const isLoginValid = () => {
      const SIX = 6;
      const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      const validEmail = (login.email && filter.test(login.email));
      const validPass = (login.password.length > SIX);

      setValidLogin(validEmail && validPass);
    };
    isLoginValid();
  }, [login.email, login.password.length]);

  const handleLoginBtn = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    setLogin({ email: '', password: '' });
    history.push('/meals');
  };

  return (
    <div>
      <form>
        <input
          onChange={ (e) => setLogin({ ...login, email: e.target.value }) }
          data-testid="email-input"
          type="email"
          name="loginEmail"
          id="emailInput"
          value={ login.email }
          placeholder="Email"
        />
        <input
          onChange={ (e) => setLogin({ ...login, password: e.target.value }) }
          data-testid="password-input"
          type="password"
          name="loginPassword"
          id="passwordInput"
          value={ login.password }
          placeholder="Password"
        />
        <button
          disabled={ !validLogin }
          onClick={ (e) => handleLoginBtn(e) }
          data-testid="login-submit-btn"
          type="button"
          name="loginBtn"
          id="loginBtn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
