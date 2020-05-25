import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../../_actions/userAction";
import { useEffect } from "react";
import store from "../../../store";

const UserQuantity = ({ users }) => {
  useEffect(() => {
    store.dispatch(getUsers());
  }, []);

  let admins;

  if (users) {
    let adminArray = users.map((user) => {
      return user.admin;
    });

    if (adminArray) {
      admins = adminArray.filter(function (x) {
        return x === true;
      }).length;
    }
  }

  return (
    <section className="box-wrapper">
      <div className="box">
        <h4>Antal registrerade</h4>
        <div className="rounded-box">{users && users.length}</div>
      </div>
      <div className="box">
        <h4>Antal admin</h4>
        <div className="rounded-box">{admins}</div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});

export default connect(mapStateToProps, { getUsers })(UserQuantity);
