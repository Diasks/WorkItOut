import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="login-wrapper">
      <h4 className="label rose">Välkommen! Logga in här</h4>
      <form className="form-container">
        <input
          className="input"
          type="email"
          name="email"
          placeholder="E-post"
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Lösenord"
        />
        <Link className="link small right" to="/">
          Glömt lösenord?
        </Link>
        <button className="btn btn-sky" type="submit">
          Logga in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
