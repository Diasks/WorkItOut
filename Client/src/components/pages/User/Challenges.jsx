import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { getFitnessSchemas } from "../../../_actions/fitnessAction";
import { useEffect } from "react";
import store from "../../../store";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import GoBackButton from "../../layout/GoBackButton";

const Challenges = ({ auth: { admin }, loading, schemas }) => {
  useEffect(() => {
    store.dispatch(getFitnessSchemas());
  }, []);

  const displayChallengesList =
    schemas &&
    schemas.map((schema, index) => (
      <Link className="link-menu" to={`/challenge/${schema._id}`}>
        <span>{schema.programTitle}</span>
        <span className="icon icon-arrow-right"></span>
      </Link>
    ));

  const redirectUser = <Redirect to="/overview" />;

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
        <h2 className="heading rose">Anta utmaning</h2>
        <ul className="centered-wrap">
          {admin === false || admin === "false"
            ? displayChallengesList && displayChallengesList
            : redirectUser}
        </ul>
        <GoBackButton/>
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
