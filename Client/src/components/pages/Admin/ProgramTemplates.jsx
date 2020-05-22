import React, { useEffect } from "react";
import { connect } from "react-redux";
import store from "../../../store";
import { Link, Redirect } from "react-router-dom";
import ProgramList from "./ProgramList";
import { getFitnessSchemas } from "../../../_actions/fitnessAction";
import AddIcon from "@material-ui/icons/Add";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";

const ProgramTemplates = ({ auth: { admin }, schemas, loading }) => {
  useEffect(() => {
    store.dispatch(getFitnessSchemas());
  }, []);

  const displayProgramTemplates = (
    <div className="login-wrapper">
      <section>
        <h3>PROGRAM</h3>
        <ul>
          {schemas === undefined ? (
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
            schemas.map((schema, index) => (
              <ProgramList key={index} schema={schema} />
            ))
          )}
        </ul>
        <Link to="/create-program">
          <AddIcon className="icon icon-addicon" /> Lägg till program
        </Link>
      </section>
    </div>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main column">
      {admin === true || admin === "true"
        ? displayProgramTemplates
        : redirectUser}
    </main>
  );
};

const mapStateToProps = (state) => ({
  schemas: state.fitness.schemas,
  loading: state.fitness.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, { getFitnessSchemas })(
  ProgramTemplates
);
