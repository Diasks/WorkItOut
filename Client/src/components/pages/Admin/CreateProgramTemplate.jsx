import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createFitnessSchema } from "../../../_actions/fitnessAction";
import { useForm } from "react-hook-form";

const CreateProgramTemplate = ({ createFitnessSchema }) => {

    
  let defaultValues = {
    programTitle: "",
    description: "",
    length: "",
    title: "",
    exerciseInformation: [{
        exerciseTitle: "",
        sets: "",
        reps: "",
        url: "",
    }]
  };

  const { register, handleSubmit, errors } = useForm({ defaultValues });

  const [formData, setFormData] = useState({
    programTitle : "",
    description: "",
    length: "",
    title: "",
    exerciseInformation:   [{
        exerciseTitle: "",
        sets: "",
        reps: "",
        url: "",
    }]
  });

  const { programTitle,
    description,
    length,
    title,
    exerciseInformation } = formData;
debugger;

  const onChange = e => {
      debugger;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
      debugger;
    createFitnessSchema({ programTitle,
        description,
        length,
        title,
        exerciseInformation });
  };


  return (
    <main className="main column">
      <div className="login-wrapper">
        <section>
          <h3>Skapa Träningsmall</h3>

          <form
            className="form-container"
            onSubmit={handleSubmit(e => onSubmit(e))}
            noValidate
          >
              <h4>Välj titel</h4>
            <input
              className={"input" + (errors.programTitle ? " error border" : "")}
              type="text"
              name="programTitle"
              placeholder="T.ex. 30-dagars yoga"
              defaultValue={defaultValues.programTitle}
              onChange={e => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.programTitle && errors.programTitle.type === "required" && (
              <span className="error message">Titel måste fyllas i</span>
            )}
   <h4>Kort Beskrivning</h4>
            <input
              className={"input" + (errors.description ? " error border" : "")}
              type="text"
              name="description"
              placeholder="T.ex. 30-dagars yoga för nybörjare eller personer som behöver repetition."
              defaultValue={defaultValues.description}
              onChange={e => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.description && errors.description.type === "required" && (
              <span className="error message">Beskrivning måste fyllas i</span>
            )}
   <h4>Antal</h4>
            <input
              className={"input" + (errors.length ? " error border" : "")}
              type="number"
              name="length"
              placeholder="T.ex. 30"
              defaultValue={defaultValues.length}
              onChange={e => onChange(e)}
              ref={register({
                required: true
              })}
            />

            {errors.length && errors.length.type === "required" && (
              <span className="error message">Antal måste fyllas i</span>
            )}

<h4>Namn på pass</h4>
            <input
              className={"input" + (errors.title ? " error border" : "")}
              type="title"
              name="title"
              placeholder="T.ex. Dag"
              defaultValue={defaultValues.title}
              onChange={e => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.title && errors.title.type === "required" && (
              <span className="error message">Namn på pass måste fyllas i</span>
            )}
   <h4>Skapa övningar</h4>
<input
              className={"input" + (errors.exerciseTitle ? " error border" : "")}
              type="exerciseTitle"
              name="exerciseTitle"
              placeholder="Övning, t.ex. Knäböj"
              defaultValue={defaultValues.exerciseTitle}
              onChange={e => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.exerciseTitle && errors.exerciseTitle.type === "required" && (
              <span className="error message">Namn på övning måste fyllas i</span>
            )}
          
          <input
              className={"input" + (errors.sets ? " error border" : "")}
              type="sets"
              name="sets"
              placeholder="Antal gånger, t.ex. 3"
              defaultValue={defaultValues.sets}
              onChange={e => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.sets && errors.sets.type === "required" && (
              <span className="error message">Antal gånger måste måste fyllas i</span>
            )}
            
            <input
              className={"input" + (errors.reps ? " error border" : "")}
              type="reps"
              name="reps"
              placeholder="Antal repetitioner, t.ex. 10"
              defaultValue={defaultValues.reps}
              onChange={e => onChange(e)}
              ref={register({ required: true })}
            />

            {errors.reps && errors.reps.type === "required" && (
              <span className="error message">Antal repetitioner måste måste fyllas i</span>
            )}

<input
              className="input"
              type="url"
              name="url"
              placeholder="Klistra in url"
              defaultValue={defaultValues.url}
              onChange={e => onChange(e)}
            />

        <label>+ Lägg till övning</label>
        

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
});

export default connect(mapStateToProps, { createFitnessSchema })(CreateProgramTemplate);
