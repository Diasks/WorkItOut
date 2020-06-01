import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFaq, deleteFaq } from "../../_actions/faqAction";
import { useEffect } from "react";
import store from "../../store";

import Alert from "../layout/Alert";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";

import Banner from "../layout/Banner";
import FaqForm from "../layout/FaqForm";

const Faq = ({
  deleteFaq,
  admin,
  isAuthenticated,
  loading,
  pager,
  pageOfFaq,
}) => {
  const [page, setPagination] = useState(pager);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page"));

    store.dispatch(getFaq(page));
  }, [page]);

  const handlePageChange = () => {
    setPagination(!page);
  };

  const handleDeleteFaq = (id) => {
    deleteFaq(id);
    window.location.reload();
  };

  const questionsAndAnswers = pageOfFaq.map((questionAndAnswer) => {
    return (
      <Fragment key={questionAndAnswer._id}>
        <div className="btn-onleft">
          {admin === "true" && (
            <button
              className="btn btn-danger small"
              onClick={(e) => handleDeleteFaq(questionAndAnswer._id)}
              type="button"
            >
              <span className="icon icon-delete big"></span>
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
        {!isAuthenticated && <Banner />}
        <main
          className={"main column" + (!isAuthenticated ? " no-margin" : "")}
        >
          <h2 className="heading">FAQ</h2>
          {admin === "true" && <FaqForm />}
          <Alert />
          <section className="faq-container">{questionsAndAnswers}</section>

          <div className="pagination-wrapper">
            {pager.pages && pager.pages.length && (
              <ul className="pagination">
                {pager.pages.map((page) => (
                  <li key={page}>
                    <Link
                      onClick={handlePageChange}
                      to={{ search: `?page=${page}` }}
                      className="pagination-link"
                    >
                      {page}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </LoadingOverlay>
    </Fragment>
  );
};

Faq.propTypes = {
  faq: PropTypes.array.isRequired,
  deleteFaq: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  admin: PropTypes.string,
  loading: PropTypes.bool,
  pager: PropTypes.object.isRequired,
  pageOfFaq: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  faq: state.faq.faq,
  pager: state.faq.pager,
  pageOfFaq: state.faq.pageOfFaq,
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
  loading: state.faq.loading,
});

export default connect(mapStateToProps, { getFaq, deleteFaq })(Faq);
