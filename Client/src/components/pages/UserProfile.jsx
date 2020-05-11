import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import UserProfileForm from "../layout/UserProfileForm";

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
        <h3>Utmaningar igång</h3>
      </main>
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

export default connect(mapStateToProps)(UserProfile);
