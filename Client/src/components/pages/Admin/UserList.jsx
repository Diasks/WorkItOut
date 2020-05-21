import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export const UserList = ({ auth: { admin }, user }) => {
  const displayUserList = (
    <div>
      <Link to={`/users/${user._id}`}>
        {user.firstname} {user.lastname}{" "}
        <ArrowForwardIosIcon className="icon icon-arrowforwardiosicon" />
      </Link>
    </div>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main column">
      {admin === true || admin === "true" ? displayUserList : redirectUser}
    </main>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserList);
