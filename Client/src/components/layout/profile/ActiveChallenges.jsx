import React from "react";
import { connect } from "react-redux";

const ActiveChallenges = ({ selectedUser }) => {
  const noChallengesActive = (
    <div className="label-nochallenge">Inga utmaningar igång</div>
  );

  const challengesActive = (
    <div>
      {selectedUser.userFitnessChallenges &&
        selectedUser.userFitnessChallenges.map((key, value) => {
          return <div>{key}</div>;
        })}
    </div>
  );

  return (
    <div className="block">
      <h3 className="heading mustard">Utmaningar igång</h3>
      {selectedUser.userFitnessChallenges
        ? challengesActive
        : noChallengesActive}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
});

export default connect(mapStateToProps)(ActiveChallenges);
