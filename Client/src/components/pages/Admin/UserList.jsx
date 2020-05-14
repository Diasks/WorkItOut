import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const UserList = ({ user }) => {
  return (
    <div>
      <Link to={`/users/${user._id}`}>
        {user.firstname} {user.lastname} <ArrowForwardIosIcon className="icon icon-arrowforwardiosicon" /> 
      </Link>
    </div>
  );
};

export default UserList;
