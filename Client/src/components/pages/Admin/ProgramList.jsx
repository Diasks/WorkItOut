import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const ProgramList = ({ schema }) => {
  return (
    <div>
      <Link to={`/programs/${schema._id}`}>
        {schema.programTitle}    <ArrowForwardIosIcon className="icon icon-arrowforwardiosicon" /> 
      </Link>
    </div>
  );
};

export default ProgramList;
