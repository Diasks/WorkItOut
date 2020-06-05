import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setAlert } from "../../_actions/alertAction";
import { registerNewPassword } from "../../_actions/userAction";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import { removeAccount } from "../../_actions/userAction";
import PropTypes from "prop-types";
import { logout } from "../../_actions/authAction";
import GoBackButton from "../layout/GoBackButton";
import HorizontalLine from "../layout/HorizontalLine";

const Settings = ({
  setAlert,
  registerNewPassword,
  removeAccount,
  logout,
  successful,
}) => {
  let defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { register, handleSubmit, errors } = useForm({ defaultValues });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = passwordData;

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
      registerNewPassword({ oldPassword, newPassword });
    }
  };

  if (successful === true) {
    logout();
  }

  return (
    <main className="main column">
      <h2 className="heading rose no-margin">Inställningar</h2>

      <div className="block">
        <h4>Ändra lösenord</h4>
        <Alert />
        <form
          className="form-container"
          onSubmit={handleSubmit((e) => onSubmit(e))}
          noValidate
        >
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
            <span className="error message">Nytt lösenord måste fyllas i</span>
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
          <button className="btn btn-mustard">Ändra</button>
        </form>
      </div>

      <div className="block">
        <h4>Radera konto</h4>
        <p className="label">Om du raderar ditt konto kan du inte ångra dig</p>
        <button className="btn btn-danger" onClick={() => removeAccount()}>
          Radera
        </button>
      </div>

      <div className="centered-wrap">
        <HorizontalLine />
      </div>

      <GoBackButton />
    </main>
  );
};

Settings.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerNewPassword: PropTypes.func.isRequired,
  removeAccount: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  successful: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
  successful: state.user.successful,
});

export default connect(mapStateToProps, {
  setAlert,
  registerNewPassword,
  removeAccount,
  logout,
})(Settings);
