import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createFitnessSchema } from "../../../_actions/fitnessAction";
import { useForm } from "react-hook-form";

const CreateProgramTemplate = ({ createFitnessSchema, successful }) => {
  const blankExerciseObject = {
    exerciseTitle: "",
    sets: "",
    reps: "",
    url: "",
  };
  const [exerciseObjectState, setExerciseObjectState] = useState([
    { ...blankExerciseObject },
  ]);

  const [fitnessState, setFitnessState] = useState({
    programTitle: "",
    description: "",
    length: "",
    title: "",
  });

  const handleFitnessChange = e =>
    setFitnessState({
      ...fitnessState,
      [e.target.name]: e.target.value,
    });

  const handleExerciseObjectChange = e => {
    const updatedExerciseObject = [...exerciseObjectState];

    updatedExerciseObject[e.target.dataset.idx][e.target.className] =
      e.target.value;
    setExerciseObjectState(updatedExerciseObject);
  };

  const addExerciseObject = () => {
    setExerciseObjectState([
      ...exerciseObjectState,
      { ...blankExerciseObject },
    ]);
  };

  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = async e => {
    createFitnessSchema(exerciseObjectState, fitnessState);
  };

  if (successful === true) {
    return <Redirect to="/programs" />;
  }

  return (
    <main className="main column">
      <div className="login-wrapper">
        <section>
          <h3>SKAPA NYTT PROGRAM</h3>

          <form
            className="form-container"
            onSubmit={handleSubmit(e => onSubmit(e))}
            noValidate
          >
            <label htmlFor="owner">Välj titel</label>
            <input
              type="text"
              name="programTitle"
              id="programTitle"
              placeholder="T.ex. 30-dagars yoga"
              className={"input" + (errors.programTitle ? " error border" : "")}
              value={fitnessState.programTitle}
              onChange={handleFitnessChange}
              ref={register({ required: true })}
            />
            {errors.programTitle && errors.programTitle.type === "required" && (
              <span className="error message">Titel måste fyllas i</span>
            )}

            <label htmlFor="description">Kort Beskrivning</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="T.ex. 30-dagars yoga för nybörjare eller personer som behöver repetition."
              className={
                "input wide" + (errors.description ? " error border" : "")
              }
              value={fitnessState.description}
              onChange={handleFitnessChange}
              ref={register({ required: true })}
            />

            {errors.description && errors.description.type === "required" && (
              <span className="error message">Beskrivning måste fyllas i</span>
            )}

            <label htmlFor="description">Antal</label>
            <input
              type="number"
              name="length"
              id="length"
              placeholder="T.ex. 30"
              className={"input" + (errors.length ? " error border" : "")}
              value={fitnessState.length}
              onChange={handleFitnessChange}
              ref={register({
                required: true,
              })}
            />

            {errors.length && errors.length.type === "required" && (
              <span className="error message">Antal måste fyllas i</span>
            )}

            <label htmlFor="description">Namn på pass</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="T.ex. Dag"
              className={"input" + (errors.title ? " error border" : "")}
              value={fitnessState.title}
              onChange={handleFitnessChange}
              ref={register({ required: true })}
            />
            {errors.title && errors.title.type === "required" && (
              <span className="error message">Namn på pass måste fyllas i</span>
            )}

            <h4>Skapa Övningar</h4>
            {exerciseObjectState.map((val, idx) => {
              const exerciseTitleId = `exerciseTitle-${idx}`;
              const setsId = `sets-${idx}`;
              const repsId = `reps-${idx}`;
              const urlId = `url-${idx}`;
              return (
                <div key={`exerciseTitle-${idx}`}>
                  <input
                    type="text"
                    name={exerciseTitleId}
                    data-idx={idx}
                    id={exerciseTitleId}
                    placeholder="Övning, t.ex. Knäböj"
                    value={exerciseObjectState[idx].exerciseTitle}
                    className={
                      "exerciseTitle" + (errors.sets ? " error border" : "")
                    }
                    onChange={handleExerciseObjectChange}
                    ref={register({ required: true })}
                  />{" "}
                  {errors.exerciseTitle &&
                    errors.exerciseTitle.type === "required" && (
                      <span className="error message">
                        Namn på övning måste fyllas i
                      </span>
                    )}
                  <input
                    type="number"
                    name={setsId}
                    data-idx={idx}
                    id={setsId}
                    placeholder="Antal gånger, t.ex. 3"
                    value={exerciseObjectState[idx].sets}
                    className={"sets" + (errors.sets ? " error border" : "")}
                    onChange={handleExerciseObjectChange}
                    ref={register({ required: true })}
                  />{" "}
                  {errors.sets && errors.sets.type === "required" && (
                    <span className="error message">
                      Antal gånger måste måste fyllas i
                    </span>
                  )}
                  <input
                    type="number"
                    name={repsId}
                    data-idx={idx}
                    id={repsId}
                    placeholder="Antal repetitioner, t.ex. 10"
                    value={exerciseObjectState[idx].reps}
                    className={"reps" + (errors.reps ? " error border" : "")}
                    onChange={handleExerciseObjectChange}
                    ref={register({ required: true })}
                  />
                  {errors.reps && errors.reps.type === "required" && (
                    <span className="error message">
                      Antal repetitioner måste måste fyllas i
                    </span>
                  )}
                  <input
                    type="text"
                    name={urlId}
                    data-idx={idx}
                    id={urlId}
                    placeholder="Klistra in url"
                    value={exerciseObjectState[idx].url}
                    className={"url" + (errors.url ? " error border" : "")}
                    onChange={handleExerciseObjectChange}
                  />
                </div>
              );
            })}
            <input
              type="button"
              value="Lägg till övning"
              onClick={addExerciseObject}
            />
            <button className="btn btn-sky" type="submit">
              Spara
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

CreateProgramTemplate.propTypes = {
  createFitnessSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  schemas: state.fitness.schemas,
  successful: state.fitness.successful,
});

export default connect(mapStateToProps, { createFitnessSchema })(
  CreateProgramTemplate
);
