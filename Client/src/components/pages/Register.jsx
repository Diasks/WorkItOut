import React, { useState } from "react";
import axios from "axios";

const Register = () => {
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

    if (password != confirmPassword) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        firstname,
        lastname,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          body,
          config
        );
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    }
  };

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

export default Register;
