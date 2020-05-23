import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFitnessSchema } from "../../../_actions/fitnessAction";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";

const ExercisesItem = ({ loading, selectedSchema, match }) => {
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
        <div>Övning</div>
      </main>
    </LoadingOverlay>
  );
};

ExercisesItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.fitness.loading,
  selectedSchema: state.fitness.selectedSchema,
});

export default connect(mapStateToProps, { getFitnessSchema })(ExercisesItem);
