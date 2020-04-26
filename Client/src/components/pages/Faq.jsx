import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFaq } from "../../_actions/faqAction";
import { useEffect } from "react";
import store from "../../store";

const Faq = ({ faq }) => {
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
    <main>
      <h2>FAQ</h2>
      <section>{questionsAndAnswers}</section>
    </main>
  );
};

Faq.propTypes = {
  faq: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  faq: state.faq.faq,
});

export default connect(mapStateToProps, { getFaq })(Faq);
