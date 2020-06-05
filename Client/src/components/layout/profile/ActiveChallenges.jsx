import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ActiveChallenges = ({ selectedUser }) => {
  const noChallengesActive = (
    <div className="label-nochallenge">Inga utmaningar igång</div>
  );

  const challengesActive = (
    <div>
      {selectedUser.userFitnessChallenge &&
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
        })}
    </div>
  );

  return (
    <div className="block">
      <h3 className="heading mustard">Utmaningar igång</h3>
      {selectedUser.userFitnessChallenge
        ? challengesActive
        : noChallengesActive}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
});

export default connect(mapStateToProps)(ActiveChallenges);
