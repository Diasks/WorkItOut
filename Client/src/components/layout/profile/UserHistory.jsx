import React from "react";
import { connect } from "react-redux";

const UserHistory = ({ selectedUser }) => {
  return (
    <main className="main">
      <h3>Historik</h3>
    </main>
  );
};

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
});

export default connect(mapStateToProps)(UserHistory);
