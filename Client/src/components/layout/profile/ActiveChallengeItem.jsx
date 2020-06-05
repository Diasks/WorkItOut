import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import { Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  updateUserChallenge,
  getUserProfile,
} from "../../../_actions/userAction";
import { useEffect } from "react";
import store from "../../../store";
import GoBackButton from "../../layout/GoBackButton";

export const ActiveChallengeItem = ({
  auth: { admin },
  selectedSchema,
  match,
  loading,
  updateUserChallenge,
  selectedUser,
}) => {
  let exerciseNumberId = match.params.id;
  let programId = match.params.challengeId;
  let userId = localStorage.getItem("id");
  let exPassed;

  useEffect(() => {
    store.dispatch(getUserProfile());
  }, []);

  const [checked, setChecked] = useState(true);

  const onSelectCheckbox = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });

    let exercisePassed = checked;

    updateUserChallenge({
      userId,
      programId,
      exerciseNumberId,
      exercisePassed,
    });
  };

  if (Object.keys(selectedUser).length !== 0) {
    selectedUser &&
      selectedUser.userFitnessChallenge.map((workout, index) => {
        workout.exerciseInformation.map((exercise, i) => {
          if (exercise._id === exerciseNumberId) {
            exPassed = exercise.exercisePassed;
          }
        });
      });
  } else {
    return <Redirect to="/profile" />;
  }

  const displayActiveChallengeItem = (
    <div>
      {selectedSchema && // eslint-disable-next-line
        selectedSchema.exerciseInformation.map((workout, index) => {
          if (workout._id === exerciseNumberId) {
            return (
              <Fragment key={workout._id}>
                <h2 className="heading rose no-margin" key={index}>
                  {selectedSchema.title} {workout.exerciseNumber}
                </h2>
                <div className="form-section left">
                  <div>
                    <input
                      className="option-input checkbox"
                      type="checkbox"
                      name="passed"
                      checked={exPassed}
                      onClick={(e) => onSelectCheckbox(e)}
                    />
                  </div>
                </div>
              </Fragment>
            );
          }
        })}

      {selectedSchema &&
        selectedSchema.exerciseInformation.map((workout, index) =>
          // eslint-disable-next-line
          workout.exerciseNumberInformation.map((exercise, index) => {
            if (workout._id === exerciseNumberId) {
              return (
                <div className="exercises-box" key={exercise._id}>
                  <h4 className="heading mustard"> {exercise.exerciseTitle}</h4>
                  <div className="exercises-box-text">
                    {exercise.sets} gånger
                  </div>
                  <div className="exercises-box-text">
                    {exercise.reps} repetitioner
                  </div>
                  {exercise.url && (
                    <div className="exercises-box-text">
                      <ReactPlayer url={exercise.url} />{" "}
                    </div>
                  )}
                </div>
              );
            }
          })
        )}

      <GoBackButton />
    </div>
  );

  const redirectUser = <Redirect to="/dashboard" />;

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
        {admin === false || admin === "false"
          ? displayActiveChallengeItem
          : redirectUser}
      </main>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  selectedSchema: state.fitness.selectedSchema,
  loading: state.fitness.loading,
  auth: state.auth,
  selectedUser: state.user.selectedUser,
});

export default connect(mapStateToProps, {
  updateUserChallenge,
  getUserProfile,
})(ActiveChallengeItem);
