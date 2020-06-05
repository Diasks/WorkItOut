import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const UserList = ({ auth: { admin }, user }) => {
  const displayUserList = (
    <Link className="link-menu" to={`/users/${user._id}`}>
      <span>
        {user.firstname} {user.lastname}{" "}
      </span>
      <span className="icon icon-arrow-right"></span>
    </Link>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <div>
      {admin === true || admin === "true" ? displayUserList : redirectUser}
    </div>
  );
};


UserList.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserList);
