import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../_actions/authAction";
import { useForm } from "react-hook-form";
import Alert from "../layout/Alert";

const LoginForm = ({ loginUser, isAuthenticated, admin }) => {
  let defaultValues = {
    email: "",
    password: "",
  };

  const { register, handleSubmit, errors } = useForm({ defaultValues });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    loginUser(email, password);
  };

  if (isAuthenticated && !admin) {
    return <Redirect to="/overview" />;
  } else if (isAuthenticated && admin) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login-wrapper">
      <h4 className="label rose">Välkommen! Logga in här</h4>
      <Alert />
      <form
        className="form-container"
        onSubmit={handleSubmit((e) => onSubmit(e))}
        noValidate
      >
        <input
          className={"input" + (errors.email ? " error border" : "")}
          type="email"
          name="email"
          placeholder="E-post"
          defaultValue={defaultValues.email}
          onChange={(e) => onChange(e)}
          ref={register({
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
        />

        {errors.email && errors.email.type === "required" && (
          <span className="error message">E-post måste fyllas i</span>
        )}

        {errors.email && errors.email.type === "pattern" && (
          <span className="error message">Vänligen ange en giltig e-post</span>
        )}

        <input
          className={"input" + (errors.password ? " error border" : "")}
          type="password"
          name="password"
          placeholder="Lösenord"
          defaultValue={defaultValues.password}
          onChange={(e) => onChange(e)}
          ref={register({ required: true })}
        />

        {errors.password && errors.password.type === "required" && (
          <span className="error message">Lösenord måste fyllas i</span>
        )}

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
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  admin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
