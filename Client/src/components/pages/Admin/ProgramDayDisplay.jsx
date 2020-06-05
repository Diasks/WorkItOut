import React, { useEffect, useState } from "react";
import store from "../../../store";
import { getFitnessSchema } from "../../../_actions/fitnessAction";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteFitnessSchema } from "../../../_actions/fitnessAction";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import Collapse from "@material-ui/core/Collapse";
import GoBackButton from "../../layout/GoBackButton";

export const ProgramDayDisplay = ({
  auth: { admin },
  selectedSchema,
  successful,
  match,
  loading,
}) => {
  let programId = match.params.id;

  const [expanded, setExpanded] = useState(false);

  /**
   * Metod som används för att hantera ett toggle-onClick-event.
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */

  const handleExpandClick = (e) => setExpanded(!expanded);
  useEffect(() => {
    store.dispatch(getFitnessSchema(programId));
    // eslint-disable-next-line
  }, []);

  if (successful === true) {
    return <Redirect to="/programs" />;
  }

  /**
   * Metod som används för att hämta träningsmallarna och dess innehåll
   *
   * @param {*} program
   */

  const getProgramContent = (fitness) => {
    let programs = [];

    for (let i = 0; i <= fitness.length; i++) {
      if (fitness[i]) {
        programs.push(
          <li className="list-style-none" key={fitness[i]._id}>
            <Link
              to={`/programs/program/${fitness[i]._id}`}
              key={fitness[i]._id}
              item={fitness}
              className="link-menu"
            >
              <span>
                {selectedSchema.title} {i + 1}
              </span>
              <span className="icon icon-arrow-right"></span>
            </Link>
          </li>
        );
      }
    }
    return programs;
  };

  const displayProgramDayDisplay = (
    <div>
      <section>
        {selectedSchema == null ? (
          <LoadingOverlay
            active={loading}
            spinner={<PulseLoader color={"#f5af61"} />}
            styles={{
              overlay: (base) => ({
                ...base,
                background: "#efeeee",
              }),
            }}
          />
        ) : (
          <div className="form-container">
            <div className="form-heading">
              <div className="link-view-more">
                <h2 className="heading rose no-margin">
                  {selectedSchema.programTitle}
                </h2>
                <button className="btn btn-toggle" onClick={handleExpandClick}>
                  <span className="icon icon-view-more"></span>
                </button>
              </div>
            </div>
            <Collapse in={expanded}>
              <button
                className="btn btn-sky"
                onClick={() => store.dispatch(deleteFitnessSchema(programId))}
              >
                Ta bort
              </button>
            </Collapse>

            <ul className="list-column-item">
              {getProgramContent(selectedSchema.exerciseInformation)}
            </ul>
          </div>
        )}
      </section>

      <GoBackButton />
    </div>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main column">
      {admin === true || admin === "true"
        ? displayProgramDayDisplay
        : redirectUser}
    </main>
  );
};

const mapStateToProps = (state) => ({
  selectedSchema: state.fitness.selectedSchema,
  loading: state.fitness.loading,
  successful: state.fitness.successful,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getFitnessSchema,
  deleteFitnessSchema,
})(ProgramDayDisplay);
