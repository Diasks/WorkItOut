import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFitnessSchema } from "../../../_actions/fitnessAction";
import { useEffect } from "react";
import store from "../../../store";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import { updateUser } from "../../../_actions/userAction";

const ChallengesDayDisplay = ({
  loading,
  selectedSchema,
  match,
  updateUser,
}) => {
  let challengeId = match.params.id;

  useEffect(() => {
    store.dispatch(getFitnessSchema(challengeId));
    // eslint-disable-next-line
  }, []);

  const onAddChallengeToUser = () => {
    debugger;
    const userId = localStorage.getItem("id");
    const userFitnessChallenge = selectedSchema;
    updateUser({ userId, userFitnessChallenge });
  };

  const getChallengeContent = (fitness) => {
    let programs = [];

    for (let i = 0; i <= fitness.length; i++) {
      if (fitness[i]) {
        programs.push(
          <li className="list-style-none" key={fitness[i]._id}>
            <Link
              to={`/exercises/${fitness[i]._id}`}
              key={fitness[i]._id}
              item={fitness}
              className="link-menu"
            >
              <span>
                {selectedSchema.title} {i + 1}
              </span>
              <span className="icon icon-arrow-right"></span>
            </Link>
          </li>
        );
      }
    }
    return programs;
  };

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
        <ul>
          {selectedSchema &&
            getChallengeContent(selectedSchema.exerciseInformation)}
        </ul>
        <button onClick={onAddChallengeToUser} className="btn btn-mustard">
          Anta utmaning
        </button>
      </main>
    </LoadingOverlay>
  );
};

ChallengesDayDisplay.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.fitness.loading,
  selectedSchema: state.fitness.selectedSchema,
});

export default connect(mapStateToProps, { getFitnessSchema, updateUser })(
  ChallengesDayDisplay
);
