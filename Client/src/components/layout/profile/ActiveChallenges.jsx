import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../../_actions/userAction";
import { useEffect } from "react";
import store from "../../../store";

const ActiveChallenges = ({ selectedUser }) => {
  useEffect(() => {
    store.dispatch(getUserProfile());
  }, []);

  const challengesActive = (
    <div className="centered-wrap">
      {selectedUser !== undefined ||
        selectedUser !== null ||
        (Object.keys(selectedUser).length !== 0 &&
          selectedUser.userFitnessChallenge.map((key, value) => {
            return (
              <Link
                key={key._id}
                className="link-menu"
                to={`/active-challenge/${key._id}`}
              >
                <span>{key.programTitle}</span>
                <span className="icon icon-arrow-right"></span>
              </Link>
            );
          }))}
    </div>
  );

  return (
    <div className="block">
      <h3 className="heading mustard">Utmaningar igång</h3>
      {challengesActive}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
});

export default connect(mapStateToProps, { getUserProfile })(ActiveChallenges);
