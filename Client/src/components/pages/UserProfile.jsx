import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import UserProfileForm from "../layout/profile/UserProfileForm";
import ActiveChallenges from "../layout/profile/ActiveChallenges";
import HorizontalLine from "../layout/HorizontalLine";
import { Link } from "react-router-dom";
import GoBackButton from "../layout/GoBackButton";

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
        <Link className="link-menu" to="/profile/history">
          <span>Historik</span>
          <span className="icon icon-arrow-right"></span>
        </Link>
        <Link className="link-menu" to="/settings">
          <span>Inställningar</span>
          <span className="icon icon-arrow-right"></span>
        </Link>
        <GoBackButton/>
      </main>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

export default connect(mapStateToProps)(UserProfile);
