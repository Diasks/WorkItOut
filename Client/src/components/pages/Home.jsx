import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="main">
      <section className="page-container">
        <h1>Hej Startsida!</h1>
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
      </section>
    </main>
  );
};

export default Home;
