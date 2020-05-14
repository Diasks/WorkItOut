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

export const ProgramItem = props => {
  const [expanded, setExpanded] = useState(false);
  let program = props.fitness;
  let programId = props.match.params.id;

  const [exerciseObjectState, setExerciseObjectState] = useState({
    exerciseId: "",
    exerciseTitle: "",
    sets: "",
    reps: "",
    url: "",
  });

  const { exerciseId, exerciseTitle, sets, reps, url } = exerciseObjectState;

  const handleExpandClick = e => setExpanded(!expanded);

  const onSubmit = async e => {
    props.updateExercise({
      exerciseId,
      programId,
      exerciseTitle,
      sets,
      reps,
      url,
    });
  };

  const onChange = async e => {
    let excerciseId = e.currentTarget.form.id;
    setExerciseObjectState({
      ...exerciseObjectState,
      [e.target.name]: e.target.value,
      exerciseId: excerciseId,
    });
  };

  const { handleSubmit } = useForm({});

  return (
    <main className="main column">
      <div className="login-wrapper">
        <section>
          {program == null ? (
            <LoadingOverlay
              active={props.loading}
              spinner={<PulseLoader color={"#f5af61"} />}
              styles={{
                overlay: base => ({
                  ...base,
                  background: "#efeeee",
                }),
              }}
            />
          ) : (
            <div>
              <h4>
                {program.title} {program.length}
              </h4>

              {program.exerciseInformation.map((exercise, index) => (
                <div>
                  {exercise._id} {index}
                  <h3> {exercise.exerciseTitle}</h3>
                  <p>{exercise.sets}</p>
                  <p>{exercise.reps}</p>
                  <div>URL: {exercise.url}</div>
                  <DeleteIcon
                    className="icon icon-deleteicon"
                    onClick={() =>
                      store.dispatch(deleteExercise(program._id, exercise._id))
                    }
                  />
                  <button
                    className="btn btn-toggle"
                    onClick={handleExpandClick}
                  >
                    <EditIcon className="icon icon-editicon" />{" "}
                  </button>
                  <Collapse in={expanded}>
                    <form
                      id={exercise._id}
                      className="form-container"
                      onSubmit={handleSubmit(e => onSubmit(e))}
                      noValidate
                    >
                      <input
                        type="text"
                        name="exerciseTitle"
                        placeholder="titel"
                        className="input"
                        value={exerciseTitle}
                        onChange={e => onChange(e)}
                      />
                      <input
                        type="number"
                        name="sets"
                        className="input"
                        value={sets}
                        placeholder="sets"
                        onChange={e => onChange(e)}
                      />
                      <input
                        type="number"
                        name="reps"
                        className="input"
                        placeholder="reps"
                        value={reps}
                        onChange={e => onChange(e)}
                      />
                      <input
                        type="text"
                        name="url"
                        className="input"
                        placeholder="url"
                        value={url}
                        onChange={e => onChange(e)}
                      />
                      <button className="btn btn-sky" type="submit">
                        Spara
                      </button>
                    </form>
                  </Collapse>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

ProgramItem.propTypes = {
  deleteFitnessSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fitness: state.fitness.selectedSchema,
  loading: state.fitness.loading,
});

export default connect(mapStateToProps, {
  deleteFitnessSchema,
  updateExercise,
  deleteExercise,
})(ProgramItem);
