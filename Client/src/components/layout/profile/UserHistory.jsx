import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserProfile, deleteActivity } from "../../../_actions/userAction";
import { useEffect } from "react";
import store from "../../../store";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import Moment from "react-moment";
import GoBackButton from "../../layout/GoBackButton";

const UserHistory = ({ selectedUser, loading, deleteActivity }) => {
  useEffect(() => {
    store.dispatch(getUserProfile());
  }, []);

  let activities;
  
    /**
   * Metod som används för att hantera radering av aktivitet via ett onClick-event
   *
   * @param {Object} id Objekt som innehåller ID på användaren och ID på den specifika aktiviteten
   */
  const handleDeleteActivity = (id) => {
    deleteActivity(id);
    window.location.reload();
  };

  if (selectedUser.activities !== undefined) {
    activities = selectedUser.activities.map((activity) => {
      return (
        <li className="list-item" key={activity._id}>
          <button className="btn btn-danger smallest" type="button">
            <span
              className="icon icon-delete"
              onClick={(e) =>
                handleDeleteActivity({
                  activityId: activity._id,
                  userId: selectedUser._id,
                })
              }
            ></span>
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
        <GoBackButton/>
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
