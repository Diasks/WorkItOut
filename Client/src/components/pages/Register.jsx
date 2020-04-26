import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../_actions/alertAction";
import { registerUser } from "../../_actions/authAction";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Alert from "../layout/Alert";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import Banner from "../layout/Banner";

const Register = ({ setAlert, registerUser, isAuthenticated, loading }) => {
  let defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { register, handleSubmit, errors } = useForm({ defaultValues });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstname, lastname, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    if (password !== confirmPassword) {
      setAlert("Lösenord matchar inte", "danger");
    } else {
      registerUser({ firstname, lastname, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/overview" />;
  }

  return (
    <LoadingOverlay
      active={loading}
      spinner={<PulseLoader color={"#f5af61"} />}
      styles={{
        overlay: (base) => ({
          ...base,
          background: "#efeeee",
        }),
      }}
    >
      <Banner />
      <main className="main column no-margin padding">
        <div className="login-wrapper">
          <Alert />
          <form
            className="form-container"
            onSubmit={handleSubmit((e) => onSubmit(e))}
            noValidate
          >
            <input
              className={"input" + (errors.firstname ? " error border" : "")}
              type="text"
              name="firstname"
              placeholder="Förnamn"
              defaultValue={defaultValues.firstname}
              onChange={(e) => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.firstname && errors.firstname.type === "required" && (
              <span className="error message">Förnamn måste fyllas i</span>
            )}

            <input
              className={"input" + (errors.lastname ? " error border" : "")}
              type="text"
              name="lastname"
              placeholder="Efternamn"
              defaultValue={defaultValues.lastname}
              onChange={(e) => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.lastname && errors.lastname.type === "required" && (
              <span className="error message">Efternamn måste fyllas i</span>
            )}

            <input
              className={"input" + (errors.email ? " error border" : "")}
              type="email"
              name="email"
              placeholder="E-post"
              defaultValue={defaultValues.email}
              onChange={(e) => onChange(e)}
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                },
              })}
            />

            {errors.email && errors.email.type === "required" && (
              <span className="error message">E-post måste fyllas i</span>
            )}

            {errors.email && errors.email.type === "pattern" && (
              <span className="error message">
                Vänligen ange en giltig e-post
              </span>
            )}

            <input
              className={"input" + (errors.password ? " error border" : "")}
              type="password"
              name="password"
              placeholder="Lösenord"
              defaultValue={defaultValues.password}
              onChange={(e) => onChange(e)}
              ref={register({ required: true, minLength: 6 })}
            />

            {errors.password && errors.password.type === "required" && (
              <span className="error message">Lösenord måste fyllas i</span>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <span className="error message">
                Lösenord måste innehålla minst 6 tecken
              </span>
            )}

            <input
              className={
                "input" + (errors.confirmPassword ? " error border" : "")
              }
              type="password"
              name="confirmPassword"
              placeholder="Repetera lösenord"
              defaultValue={defaultValues.confirmPassword}
              onChange={(e) => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <span className="error message">Lösenord måste fyllas i</span>
              )}

            <button className="btn btn-sky" type="submit">
              Registrera
            </button>
          </form>
        </div>
      </main>
    </LoadingOverlay>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  admin: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
