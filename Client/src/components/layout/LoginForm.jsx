import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../_actions/authAction";

const LoginForm = ({ login, isAuthenticated, admin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated && !admin) {
    return <Redirect to="/overview" />;
  } else if (isAuthenticated && admin) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login-wrapper">
      <h4 className="label rose">Välkommen! Logga in här</h4>
      <form className="form-container" onSubmit={(e) => onSubmit(e)}>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <Link to="/" className="link small right">
          Glömt lösenord?
        </Link>
        <button className="btn btn-sky" type="submit">
          Logga in
        </button>
        <div className="margin">
          <span className="text small bold">Inget konto?</span>
          <Link to="/register" className="link small">
            Registrera dig här
          </Link>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  admin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
});

export default connect(mapStateToProps, { login })(LoginForm);
