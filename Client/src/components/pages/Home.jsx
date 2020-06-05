import React, { Fragment } from "react";
import LoginForm from "../layout/LoginForm";
import Banner from "../layout/Banner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";

const Home = ({ loading }) => {
  return (
    <Fragment>
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
        <main className="main no-margin padding">
          <section className="page-container">
            <LoginForm />
          </section>
        </main>
      </LoadingOverlay>
    </Fragment>
  );
};

Home.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Home);
