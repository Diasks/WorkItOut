import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export const ProgramList = ({ auth: { admin }, schema }) => {
  const displayProgramList = (
    <div>
      <Link className="link-menu" to={`/programs/${schema._id}`}>
        <span>{schema.programTitle}</span>
        <span className="icon icon-arrow-right"></span>
      </Link>
    </div>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <div>
      {admin === true || admin === "true" ? displayProgramList : redirectUser}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProgramList);
