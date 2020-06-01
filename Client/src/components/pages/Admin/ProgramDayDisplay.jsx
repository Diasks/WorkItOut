import React, { useEffect, useState } from "react";
import store from "../../../store";
import { getFitnessSchema } from "../../../_actions/fitnessAction";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteFitnessSchema } from "../../../_actions/fitnessAction";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Collapse from "@material-ui/core/Collapse";

export const ProgramDayDisplay = (props) => {
  let program = props.fitness;
  let programId = props.match.params.id;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (e) => setExpanded(!expanded);
  useEffect(() => {
    store.dispatch(getFitnessSchema(programId));
    // eslint-disable-next-line
  }, []);

  if (props.successful === true) {
    return <Redirect to="/programs" />;
  }

  const getProgramContent = (program) => {
    let content = [];

    for (let i = 1; i <= program.length; i++) {
      const item = program;

      content.push(
        <li>
          <Link to={`/programs/program/${item._id}`} key={item._id} item={item}>
            {item.title} {i}{" "}
            <ArrowForwardIosIcon className="icon icon-arrowforwardiosicon" />{" "}
          </Link>
        </li>
      );
    }
    return content;
  };

  const displayProgramDayDisplay = (
    <div className="login-wrapper">
      <section>
        {program == null ? (
          <LoadingOverlay
            active={props.loading}
            spinner={<PulseLoader color={"#f5af61"} />}
            styles={{
              overlay: (base) => ({
                ...base,
                background: "#efeeee",
              }),
            }}
          />
        ) : (
          <div>
            <div>
              {" "}
              <h3>{program.programTitle} </h3>{" "}
              <button className="btn btn-toggle" onClick={handleExpandClick}>
                <MoreVertIcon className="icon icon-moreverticon" />
              </button>{" "}
            </div>
            <Collapse in={expanded}>
              <button
                className="btn btn-sky"
                onClick={() => store.dispatch(deleteFitnessSchema(programId))}
              >
                Ta bort program
              </button>
            </Collapse>

            <ul>{getProgramContent(program)}</ul>
          </div>
        )}
      </section>
    </div>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main column">
      {props.auth.admin === true || props.auth.admin === "true"
        ? displayProgramDayDisplay
        : redirectUser}
    </main>
  );
};

const mapStateToProps = (state) => ({
  fitness: state.fitness.selectedSchema,
  loading: state.fitness.loading,
  successful: state.fitness.successful,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getFitnessSchema,
  deleteFitnessSchema,
})(ProgramDayDisplay);
