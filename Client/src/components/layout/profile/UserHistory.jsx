import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserProfile, deleteActivity } from "../../../_actions/userAction";
import { useEffect } from "react";
import store from "../../../store";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import DeleteIcon from "@material-ui/icons/Delete";
import Moment from "react-moment";

const UserHistory = ({ selectedUser, loading, deleteActivity }) => {
  useEffect(() => {
    store.dispatch(getUserProfile());
  }, []);

  const handleEditActivity = (e) => {
    console.log(e);
  };

  let activities;

  if (selectedUser.activities !== undefined) {
    activities = selectedUser.activities.map((activity) => {
      return (
        <li className="list-item" key={activity._id}>
          <button className="btn btn-danger small" type="button">
            <DeleteIcon
              className="icon icon-delete"
              onClick={(e) =>
                deleteActivity({
                  activityId: activity._id,
                  userId: selectedUser._id,
                })
              }
            />
          </button>
          <Moment className="date" format="YYYY-MM-DD">
            {activity.date}
          </Moment>
          <div className="title">{activity.title}</div>
          <div className="timeInMinutes">{activity.time} min</div>
          <div className="btn-wrap"></div>
        </li>
      );
    });
  }

  return (
    <LoadingOverlay
      active={loading}
      spinner={<PulseLoader color={"#f5af61"} />}
      styles={{
        overlay: (base) => ({
          ...base,
          background: "#efeeee",
        }),
      }}
    >
      <main className="main column">
        <h2 className="heading rose">Historik</h2>
        <ul className="list">{activities}</ul>
      </main>
    </LoadingOverlay>
  );
};

UserHistory.propTypes = {
  deleteActivity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { getUserProfile, deleteActivity })(
  UserHistory
);
