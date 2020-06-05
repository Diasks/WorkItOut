import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import { Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import GoBackButton from "../../layout/GoBackButton";

export const ExerciseItem = ({
  auth: { admin },
  selectedSchema,
  match,
  loading,
}) => {
  let programId = match.params.id;

  const displayExerciseItem = (
    <section className="workout-wrap">
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

      <div className="workout-exercises-wrap">
        {selectedSchema &&
          selectedSchema.exerciseInformation.map((workout, index) =>
            // eslint-disable-next-line
            workout.exerciseNumberInformation.map((exercise, index) => {
              if (workout._id === programId) {
                return (
                  <div className="exercises-box" key={exercise._id}>
                    <h4 className="heading mustard">
                      {" "}
                      {exercise.exerciseTitle}
                    </h4>
                    <div className="exercises-box-text">
                      {exercise.sets} gånger
                    </div>
                    <div className="exercises-box-text">
                      {exercise.reps} repetitioner
                    </div>
                    {exercise.url && (
                      <div className="player-wrap">
                        <ReactPlayer url={exercise.url} className="player" />
                      </div>
                    )}
                  </div>
                );
              }
            })
          )}
      </div>

      <GoBackButton />
    </section>
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

const mapStateToProps = (state) => ({
  selectedSchema: state.fitness.selectedSchema,
  loading: state.fitness.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ExerciseItem);
