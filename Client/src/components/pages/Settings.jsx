import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setAlert } from "../../_actions/alertAction";
import { registerNewPassword } from "../../_actions/userAction";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import { removeAccount } from "../../_actions/userAction";
import store from "../../store";
import { logout } from "../../_actions/authAction";

const Settings = ({setAlert, registerNewPassword, removeAccount, logout, successful}) => {
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

  const onChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

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
      <h1>Inställningar</h1>
      <h3>Tillåt push-notiser</h3> <button>switch me</button>
      <p>någon text här</p>
      <h3>Tillåt push-notiser</h3> <button>switch me</button>
      <p>någon text här</p>

      <h3>Ändra lösenord</h3>
      <Alert />
      <form className="form-container" onSubmit={handleSubmit((e) => onSubmit(e))}
            noValidate>
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
              <span className="error message">Gammalt lösenord måste fyllas i</span>
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
        <button className="btn btn-sky">Ändra</button>
      </form>

      <h3>Radera konto</h3>
      <p>Om du raderar ditt konto kan du inte ångra dig</p>
      <button className="btn btn-sky" onClick={() => store.dispatch(removeAccount())}>Radera</button>

                    
                
    </main>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  successful: state.user.successful,
});

export default connect(mapStateToProps, { setAlert, registerNewPassword, removeAccount, logout })(Settings);