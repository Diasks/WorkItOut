import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFaq, deleteFaq } from "../../_actions/faqAction";
import { useEffect } from "react";
import store from "../../store";
import FaqForm from "../layout/FaqForm";
import Alert from "../layout/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import Banner from "../layout/Banner";

const Faq = ({ faq, deleteFaq, admin, isAuthenticated }) => {
  useEffect(() => {
    store.dispatch(getFaq());
  }, []);

  const questionsAndAnswers = faq.map((questionAndAnswer) => {
    return (
      <Fragment key={questionAndAnswer._id}>
        <div className="btn-onleft">
          {admin === "true" && (
            <button
              className="btn btn-danger small"
              onClick={(e) => deleteFaq(questionAndAnswer._id)}
              type="button"
            >
              <DeleteIcon className="icon icon-delete" />
            </button>
          )}
          <div className="faq bold">{questionAndAnswer.question}</div>
        </div>
        <div className={"faq" + (admin === "true" ? " extra-padding" : "")}>
          {questionAndAnswer.answer}
        </div>
      </Fragment>
    );
  });

  return (
    <Fragment>
      {!isAuthenticated && <Banner />}
      <main className={"main column" + (!isAuthenticated ? " no-margin" : "")}>
        <h2 className="heading">FAQ</h2>
        {admin === "true" && <FaqForm />}
        <Alert />
        <section className="faq-container">{questionsAndAnswers}</section>
      </main>
    </Fragment>
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
