import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFaq } from "../../_actions/faqAction";
import { useEffect } from "react";
import store from "../../store";
import FaqForm from "../layout/FaqForm";

const Faq = ({ faq, admin }) => {
  useEffect(() => {
    store.dispatch(getFaq());
  }, []);

  const questionsAndAnswers = faq.map((questionAndAnswer) => {
    return (
      <Fragment key={questionAndAnswer.id}>
        <div className="faq bold">{questionAndAnswer.question}</div>
        <div className="faq">{questionAndAnswer.answer}</div>
      </Fragment>
    );
  });

  return (
    <main className="main column">
      <h2>FAQ</h2>
      {admin === "true" && <FaqForm />}
      <section className="faq-container">{questionsAndAnswers}</section>
    </main>
  );
};

Faq.propTypes = {
  faq: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
  admin: PropTypes.string,
};

const mapStateToProps = (state) => ({
  faq: state.faq.faq,
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
});

export default connect(mapStateToProps, { getFaq })(Faq);
