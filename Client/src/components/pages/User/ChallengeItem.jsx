import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFitnessSchema } from "../../../_actions/fitnessAction";
import { useEffect } from "react";
import store from "../../../store";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import GoBackButton from "../../layout/GoBackButton";

const ChallengeItem = ({ loading, selectedSchema, match }) => {
  let challengeId = match.params.id;

  useEffect(() => {
    store.dispatch(getFitnessSchema(challengeId));
    // eslint-disable-next-line
  }, []);

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
        <h3 className="heading rose">
          {selectedSchema && selectedSchema.programTitle}
        </h3>
        <ul></ul>
        <GoBackButton/>
      </main>
    </LoadingOverlay>
  );
};

ChallengeItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.fitness.loading,
  selectedSchema: state.fitness.selectedSchema,
});

export default connect(mapStateToProps, { getFitnessSchema })(ChallengeItem);
