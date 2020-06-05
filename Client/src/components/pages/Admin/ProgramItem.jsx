import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateExercise } from "../../../_actions/fitnessAction";
import store from "../../../store";
import { deleteFitnessSchema } from "../../../_actions/fitnessAction";
import { deleteExercise } from "../../../_actions/fitnessAction";
import Collapse from "@material-ui/core/Collapse";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import ReactPlayer from "react-player";

export const ProgramItem = ({
  auth: { admin },
  selectedSchema,
  match,
  updateExercise,
  loading,
}) => {
  const [expanded, setExpanded] = useState(false);
  let programId = match.params.id;

  const [exerciseObjectState, setExerciseObjectState] = useState({
    exerciseId: "",
    exerciseTitle: "",
    sets: "",
    reps: "",
    url: "",
  });

  const { exerciseId, exerciseTitle, sets, reps, url } = exerciseObjectState;

  /**
   * Metod som används för att hantera toggle av formuläret vid uppdatering av övningar
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const handleExpandClick = (e) => setExpanded(!expanded);

  let exerciseNumberInformation;

  selectedSchema &&
    // eslint-disable-next-line
    selectedSchema.exerciseInformation.map((workout, value) => {
      if (workout._id === programId) {
        return (exerciseNumberInformation = workout.exerciseNumberInformation);
      }
    });

  /**
   * Metod som används för att hantera när värdet av ett element har ändrats
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const onChange = async (e) => {
    let excerciseId = e.currentTarget.form.id;
    setExerciseObjectState({
      ...exerciseObjectState,
      [e.target.name]: e.target.value,
      exerciseId: excerciseId,
    });
  };

  /**
   * Metod som används för att uppdatera övningar i passet
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */

  const onSubmit = async (e) => {
    const fitnessId = selectedSchema._id;
    updateExercise({
      exerciseId,
      fitnessId,
      exerciseTitle,
      sets,
      reps,
      url,
      exerciseNumberInformation,
    });
  };

  const { handleSubmit } = useForm({});

  const displayProgramItem = (
    <div>
      {selectedSchema &&
        // eslint-disable-next-line
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
                  <div>
                    <DeleteIcon
                      className="icon icon-deleteicon"
                      onClick={() =>
                        store.dispatch(
                          deleteExercise(
                            selectedSchema._id,
                            workout.exerciseNumber,
                            exercise._id
                          )
                        )
                      }
                    />
                    <button
                      className="btn btn-toggle"
                      onClick={handleExpandClick}
                    >
                      <EditIcon className="icon icon-editicon" />{" "}
                    </button>
                  </div>
                  <Collapse in={expanded}>
                    <form
                      id={exercise._id}
                      className="form-container"
                      onSubmit={handleSubmit((e) => onSubmit(e))}
                      noValidate
                    >
                      <input
                        type="text"
                        name="exerciseTitle"
                        placeholder="titel"
                        className="input"
                        value={exerciseTitle}
                        onChange={(e) => onChange(e)}
                      />
                      <input
                        type="number"
                        name="sets"
                        className="input"
                        value={sets}
                        placeholder="sets"
                        onChange={(e) => onChange(e)}
                      />
                      <input
                        type="number"
                        name="reps"
                        className="input"
                        placeholder="reps"
                        value={reps}
                        onChange={(e) => onChange(e)}
                      />
                      <input
                        type="text"
                        name="url"
                        className="input"
                        placeholder="url"
                        value={url}
                        onChange={(e) => onChange(e)}
                      />
                      <button className="btn btn-sky" type="submit">
                        Spara
                      </button>
                    </form>
                  </Collapse>
                </div>
              );
            }
          })
        )}
    </div>
  );

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
        {admin === true || admin === "true" ? displayProgramItem : redirectUser}
      </main>
    </LoadingOverlay>
  );
};

ProgramItem.propTypes = {
  deleteFitnessSchema: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedSchema: state.fitness.selectedSchema,
  loading: state.fitness.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteFitnessSchema,
  updateExercise,
  deleteExercise,
})(ProgramItem);
