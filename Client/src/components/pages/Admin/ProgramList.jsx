import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

export const ProgramList = ({ auth: { admin }, schema }) => {
  const displayProgramList = (
    <div className="centered-wrap">
      <Link className="link-menu" to={`/programs/${schema._id}`}>
        <span>{schema.programTitle}</span>
        <span className="icon icon-arrow-right"></span>
      </Link>
    </div>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <div className="list-column-item">
      {admin === true || admin === "true" ? displayProgramList : redirectUser}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProgramList);
