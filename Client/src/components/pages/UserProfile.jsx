import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import UserProfileForm from "../layout/profile/UserProfileForm";
import ActiveChallenges from "../layout/profile/ActiveChallenges";
import HorizontalLine from "../layout/HorizontalLine";
import { Link } from "react-router-dom";

const UserProfile = ({ loading }) => {
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
        <UserProfileForm />
        <ActiveChallenges />
        <HorizontalLine />
        <Link to="/profile/history">Historik</Link>
        <Link to="/settings">Inställningar</Link>
      </main>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

export default connect(mapStateToProps)(UserProfile);
