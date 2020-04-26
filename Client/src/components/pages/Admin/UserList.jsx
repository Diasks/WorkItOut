import React from "react";
import { Link } from "react-router-dom";

export const UserList = ({ user }) => {
  return (
    <div>
      <Link to={`/users/${user._id}`}>
        {user.firstname} {user.lastname} >
      </Link>
    </div>
  );
};

export default UserList;
