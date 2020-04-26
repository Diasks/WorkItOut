import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFaq, deleteFaq } from "../../_actions/faqAction";
import { useEffect } from "react";
import store from "../../store";
import FaqForm from "../layout/FaqForm";
import Alert from "../layout/Alert";

const Faq = ({ faq, deleteFaq, admin }) => {
  useEffect(() => {
    store.dispatch(getFaq());
  }, []);

  const questionsAndAnswers = faq.map((questionAndAnswer) => {
    return (
      <Fragment key={questionAndAnswer._id}>
        <div className="faq bold">{questionAndAnswer.question}</div>
        <div className="faq">{questionAndAnswer.answer}</div>
        {admin === "true" && (
          <button
            onClick={(e) => deleteFaq(questionAndAnswer._id)}
            type="button"
          >
            Ta bort
          </button>
        )}
      </Fragment>
    );
  });

  return (
    <main className="main column">
      <h2>FAQ</h2>
      {admin === "true" && <FaqForm />}
      <Alert />
      <section className="faq-container">{questionsAndAnswers}</section>
    </main>
  );
};

Faq.propTypes = {
  faq: PropTypes.array.isRequired,
  deleteFaq: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  admin: PropTypes.string,
};

const mapStateToProps = (state) => ({
  faq: state.faq.faq,
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
});

export default connect(mapStateToProps, { getFaq, deleteFaq })(Faq);
