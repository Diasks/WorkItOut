import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import UserProfileForm from "../layout/profile/UserProfileForm";
import ActiveChallenges from "../layout/profile/ActiveChallenges";
import HorizontalLine from "../layout/HorizontalLine";
import { Link } from "react-router-dom";
import GoBackButton from "../layout/GoBackButton";

const UserProfile = ({ auth: { admin }, loading }) => {
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
        {admin === "false" || admin === false ? <ActiveChallenges /> : null}

        <div className="centered-wrap">
          <HorizontalLine />
        </div>
        <div className="centered-wrap">
          {admin === "false" || admin === false ? (
            <Link className="link-menu" to="/profile/history">
              <span>Historik</span>
              <span className="icon icon-arrow-right"></span>
            </Link>
          ) : null}
          <Link className="link-menu" to="/settings">
            <span>Inställningar</span>
            <span className="icon icon-arrow-right"></span>
          </Link>
        </div>
        <GoBackButton />
      </main>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  auth: state.auth,
});

export default connect(mapStateToProps)(UserProfile);
