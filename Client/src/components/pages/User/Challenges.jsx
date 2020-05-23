import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { getFitnessSchemas } from "../../../_actions/fitnessAction";
import { useEffect } from "react";
import store from "../../../store";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";

const Challenges = ({ auth: { admin }, loading, schemas }) => {
  useEffect(() => {
    store.dispatch(getFitnessSchemas());
  }, []);

  const redirectUser = <Redirect to="/dashboard" />;

  const displaySchemas = schemas.map((key, value) => {
    return (
      <li key={key._id}>
        <Link to={`/challenges/${key._id}`}>
          <div>{key.programTitle}</div>
        </Link>
      </li>
    );
  });

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
      <main className="main column">
        <div>Hej challenges</div>
        <ul>
          {admin === false || admin === "false"
            ? displaySchemas && displaySchemas
            : redirectUser}
        </ul>
      </main>
    </LoadingOverlay>
  );
};

Challenges.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.fitness.loading,
  schemas: state.fitness.schemas,
});

export default connect(mapStateToProps, { getFitnessSchemas })(Challenges);
