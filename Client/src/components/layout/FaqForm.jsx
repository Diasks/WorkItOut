import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFaq } from "../../_actions/faqAction";
import { useForm } from "react-hook-form";
import Collapse from "@material-ui/core/Collapse";
import AddIcon from "@material-ui/icons/Add";

const Faq = ({ addFaq }) => {
  let defaultValues = {
    question: "",
    answer: "",
  };

  const { register, handleSubmit, errors, reset } = useForm({ defaultValues });

  const [formData, setFormData] = useState("");
  const [expanded, setExpanded] = useState(false);

  const { question, answer } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    reset();
    addFaq({ question, answer });
    window.location.reload();
  };

  const handleExpandClick = (e) => setExpanded(!expanded);

  const form = (
    <form
      className="form-container"
      onSubmit={handleSubmit((e) => onSubmit(e))}
    >
      <input
        className={"input wide" + (errors.question ? " error border" : "")}
        type="text"
        name="question"
        placeholder="Fråga"
        defaultValue={defaultValues.question}
        onChange={(e) => onChange(e)}
        ref={register({ required: true })}
      />
      {errors.question && errors.question.type === "required" && (
        <span className="error message">Fråga måste fyllas i</span>
      )}

      <textarea
        className={
          "input wide textarea" + (errors.answer ? " error border" : "")
        }
        type="text"
        name="answer"
        placeholder="Svar"
        defaultValue={defaultValues.answer}
        onChange={(e) => onChange(e)}
        ref={register({ required: true })}
        rows="4"
      />

      {errors.answer && errors.answer.type === "required" && (
        <span className="error message">Svar måste fyllas i</span>
      )}

      <button className="btn btn-sky" type="submit">
        Lägg till
      </button>
    </form>
  );

  return (
    <section>
      <button className="btn btn-toggle" onClick={handleExpandClick}>
        <AddIcon className="icon-add" /> Lägg till FAQ
      </button>
      <Collapse in={expanded}>{form}</Collapse>
    </section>
  );
};

Faq.propTypes = {
  addFaq: PropTypes.func.isRequired,
};

export default connect(null, { addFaq })(Faq);
