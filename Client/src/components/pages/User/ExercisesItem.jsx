import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import { Redirect } from "react-router-dom";
import ReactPlayer from "react-player";

export const ExerciseItem = ({
  auth: { admin },
  selectedSchema,
  match,
  loading,
}) => {
  let programId = match.params.id;

  const displayExerciseItem = (
    <div>
      {selectedSchema && // eslint-disable-next-line
        selectedSchema.exerciseInformation.map((workout, index) => {
          if (workout._id === programId) {
            return (
              <h2 className="heading rose no-margin" key={index}>
                {selectedSchema.title} {workout.exerciseNumber}
              </h2>
            );
          }
        })}

      {selectedSchema &&
        selectedSchema.exerciseInformation.map((workout, index) =>
          // eslint-disable-next-line
          workout.exerciseNumberInformation.map((exercise, index) => {
            if (workout._id === programId) {
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
          ? displayExerciseItem
          : redirectUser}
      </main>
    </LoadingOverlay>
  );
};

ExerciseItem.propTypes = {
  deleteFitnessSchema: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedSchema: state.fitness.selectedSchema,
  loading: state.fitness.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ExerciseItem);
