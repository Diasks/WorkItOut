import React, { Fragment } from "react";
import LoginForm from "../layout/LoginForm";
import Banner from "../layout/Banner";

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <main className="main home">
        <section className="page-container">
          <LoginForm />
        </section>
      </main>
    </Fragment>
  );
};

export default Home;
