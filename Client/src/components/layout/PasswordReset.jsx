import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setAlert } from "../../_actions/alertAction";
import { registerNewPassword } from "../../_actions/userAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import GoBackButton from "../layout/GoBackButton";
import { Redirect } from "react-router-dom";
import Banner from "../layout/Banner";
import HorizontalLine from "../layout/HorizontalLine";

const PasswordReset = ({ setAlert, registerNewPassword, successful }) => {
  let defaultValues = {
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { register, handleSubmit, errors } = useForm({ defaultValues });

  const [passwordData, setPasswordData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { email, oldPassword, newPassword, confirmPassword } = passwordData;

  /**
   * Metod som används för att hantera när värdet av ett element har ändrats
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const onChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  /**
   * Metod används för att hantera när formuläret skickas
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const onSubmit = async (e) => {
    if (newPassword !== confirmPassword) {
      setAlert("Lösenord matchar inte", "danger");
    } else {
      registerNewPassword({ email, oldPassword, newPassword });
    }
  };

  if (successful === true) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Banner />
      <main className="main column no-margin padding">
        <div className="login-wrapper">
          <h4 className="label rose">Glömt ditt lösenord? Återställ här</h4>
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
              <span className="error message">
                Vänligen ange en giltig e-post
              </span>
            )}

            <input
              className={"input" + (errors.oldPassword ? " error border" : "")}
              type="password"
              name="oldPassword"
              placeholder="Gammalt lösenord"
              defaultValue={defaultValues.oldPassword}
              onChange={(e) => onChange(e)}
              ref={register({ required: true, minLength: 6 })}
            />

            {errors.oldPassword && errors.oldPassword.type === "required" && (
              <span className="error message">
                Gammalt lösenord måste fyllas i
              </span>
            )}

            <input
              className={"input" + (errors.newPassword ? " error border" : "")}
              type="password"
              name="newPassword"
              placeholder="Nytt lösenord"
              defaultValue={defaultValues.newPassword}
              onChange={(e) => onChange(e)}
              ref={register({ required: true, minLength: 6 })}
            />

            {errors.newPassword && errors.newPassword.type === "required" && (
              <span className="error message">
                Nytt lösenord måste fyllas i
              </span>
            )}

            {errors.newPassword && errors.newPassword.type === "minLength" && (
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
            <button className="btn btn-mustard">Spara</button>
          </form>

          <div className="centered-wrap">
            <HorizontalLine />
          </div>

          <GoBackButton />
        </div>
      </main>
    </div>
  );
};

PasswordReset.propTypes = {
  registerNewPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  successful: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
  successful: state.user.successful,
});

export default connect(mapStateToProps, { setAlert, registerNewPassword })(
  PasswordReset
);
