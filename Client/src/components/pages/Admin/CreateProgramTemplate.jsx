import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createFitnessSchema } from "../../../_actions/fitnessAction";
import { useForm } from "react-hook-form";

const CreateProgramTemplate = ({
  auth: { admin },
  createFitnessSchema,
  successful,
}) => {
  const [fitnessState, setFitnessState] = useState({
    programTitle: "",
    description: "",
    length: "",
    title: "",
  });

  const handleFitnessChange = (e) =>
    setFitnessState({
      ...fitnessState,
      [e.target.name]: e.target.value,
    });

  const blankExerciseObject = {
    exerciseNumber: "",
    exerciseNumberInformation: [
      { exerciseTitle: "", sets: "", reps: "", url: "" },
    ],
  };

  const [exerciseObjectState, setExerciseObjectState] = useState([
    { ...blankExerciseObject },
  ]);

  const handleExerciseObjectChange = (e) => {
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

  const onSubmit = async (e) => {
    console.log(exerciseObjectState);
    //createFitnessSchema(exerciseObjectState, fitnessState);
  };

  if (successful === true) {
    return <Redirect to="/programs" />;
  }

  const displayCreateProgramTemplate = (
    <main className="main column no-margin">
      <h2 className="heading rose no-margin">Skapa nytt program</h2>

      <form
        className="form-container"
        onSubmit={handleSubmit((e) => onSubmit(e))}
        noValidate
      >
        <div className="form-section">
          <label className="form-label">Välj titel</label>
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
        </div>

        <div className="form-section">
          <label className="form-label">Kort Beskrivning</label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="T.ex. 30-dagars yoga för nybörjare eller personer som behöver repetition."
            className={
              "input textarea" + (errors.description ? " error border" : "")
            }
            value={fitnessState.description}
            onChange={handleFitnessChange}
            ref={register({ required: true })}
          />

          {errors.description && errors.description.type === "required" && (
            <span className="error message">Beskrivning måste fyllas i</span>
          )}
        </div>

        <div className="form-section">
          <label className="form-label">Namn på pass</label>
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
        </div>

        <div className="form-section">
          <label className="form-label">Skapa övningar</label>
          <input
            type="text"
            name="exerciseNumber"
            placeholder="Nummer på pass"
            className="input"
          />

          {exerciseObjectState.map((val, idx) => {
            const exerciseTitleId = `exerciseTitle-${idx}`;
            const setsId = `sets-${idx}`;
            const repsId = `reps-${idx}`;
            const urlId = `url-${idx}`;
            return (
              <div className="form-section-table" key={`exerciseTitle-${idx}`}>
                <input
                  type="text"
                  name={exerciseTitleId}
                  data-idx={idx}
                  id={exerciseTitleId}
                  placeholder="Övning, t.ex. Knäböj"
                  value={exerciseObjectState[idx].exerciseTitle}
                  className={
                    "input exerciseTitle" + (errors.sets ? " error border" : "")
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
                  className={
                    "input sets" + (errors.sets ? " error border" : "")
                  }
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
                  className={
                    "input reps" + (errors.reps ? " error border" : "")
                  }
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
                  className={"input url" + (errors.url ? " error border" : "")}
                  onChange={handleExerciseObjectChange}
                />
              </div>
            );
          })}

          <div className="link-add left">
            <span className="icon icon-add"></span>
            <input
              type="button"
              value="Lägg till övning"
              onClick={addExerciseObject}
              className="link-add"
            />
          </div>
        </div>

        <button className="btn btn-sky" type="submit">
          Spara
        </button>
      </form>
    </main>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main column">
      {admin === true || admin === "true"
        ? displayCreateProgramTemplate
        : redirectUser}
    </main>
  );
};

CreateProgramTemplate.propTypes = {
  createFitnessSchema: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  schemas: state.fitness.schemas,
  successful: state.fitness.successful,
  auth: state.auth,
});

export default connect(mapStateToProps, { createFitnessSchema })(
  CreateProgramTemplate
);
