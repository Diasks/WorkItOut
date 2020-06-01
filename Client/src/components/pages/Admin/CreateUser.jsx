import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUser } from "../../../_actions/userAction";
import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
import GoBackButton from "../../layout/GoBackButton";

const CreateUser = ({ isAdmin, createUser, successful }) => {

  // let history = useHistory();
    
  let defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    admin: false,
  };

  const { register, handleSubmit, errors } = useForm({ defaultValues });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    admin: false,
  });

  const { firstname, lastname, email, password, admin } = formData;
    /**
   * Metod som används för att hantera när värdet av ett element har ändrats
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   /**
   * Metod som används för att hantera när formuläret skickas
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const onSubmit = async (e) => {
    createUser({ firstname, lastname, email, password, admin });
  };

  if (successful === true) {
    return <Redirect to="/users" />;
  }

  const displayCreateUser = (
    <div className="login-wrapper">
      <section>
        <h2 className="heading rose no-margin">Skapa ny användare</h2>

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

          <div className="form-section left">
            <div>
              <input
                className="input-checkbox-switch switch"
                type="checkbox"
                name="admin"
                defaultValue={defaultValues.admin}
                onChange={(e) =>
                  onChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked,
                    },
                  })
                }
              />
              <label className="form-label">Admin?</label>
            </div>
          </div>

          <button className="btn btn-mustard" type="submit">
            Skapa
          </button>
        </form>
        <GoBackButton/>
        {/* <button onClick={() => history.goBack()}>Back</button> */}
      </section>
    </div>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main column">
      {isAdmin === true || isAdmin === "true"
        ? displayCreateUser
        : redirectUser}
    </main>
  );
};

CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  successful: state.user.successful,
  isAdmin: state.auth.admin,
});

export default connect(mapStateToProps, { createUser })(CreateUser);
