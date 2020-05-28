import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export const ProgramList = ({ auth: { admin }, schema }) => {
  const displayProgramList = (
    <div>
      <Link to={`/programs/${schema._id}`}>
        {schema.programTitle}{" "}
        <ArrowForwardIosIcon className="icon icon-arrowforwardiosicon" />
      </Link>
    </div>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main column">
      {admin === true || admin === "true" ? displayProgramList : redirectUser}
    </main>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProgramList);
