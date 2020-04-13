import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../_actions/alertAction";
import { register } from "../../_actions/authAction";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstname, lastname, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ firstname, lastname, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/overview" />;
  }

  return (
    <main className="main column">
      <div className="login-wrapper">
        <form className="form-container" onSubmit={(e) => onSubmit(e)}>
          <input
            className="input"
            type="text"
            name="firstname"
            placeholder="Förnamn"
            value={firstname}
            onChange={(e) => onChange(e)}
            required
          />

          <input
            className="input"
            type="text"
            name="lastname"
            placeholder="Efternamn"
            value={lastname}
            onChange={(e) => onChange(e)}
            required
          />

          <input
            className="input"
            type="email"
            name="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />

          <input
            className="input"
            type="password"
            name="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />

          <input
            className="input"
            type="password"
            name="confirmPassword"
            placeholder="Repetera lösenord"
            value={confirmPassword}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />

          <button className="btn btn-sky" type="submit">
            Registrera
          </button>
        </form>
      </div>
    </main>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  admin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
