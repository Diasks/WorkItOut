import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../../store";
import { getUsers } from "../../../_actions/userAction";
import UserList from "./UserList";
import Spinner from "../../layout/Spinner";

const Users = ({ users }) => {
  useEffect(() => {
    store.dispatch(getUsers());
  }, []);


  return (
    <main className="main column">
      <section>
        <h3>ANVÄNDARLISTA</h3>
        <input
          className="input"
          type="text"
          name="#"
          placeholder="Sök.."
        />{" "}
        <button>SökIkon</button>
        <ul>
          {users === undefined ? (
            <Spinner />
          ) : (
            users.map((user, index) => <UserList key={index} user={user} />)
          )}
        </ul>
      </section>
    </main>
  );
};


Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.user.users,
});



export default connect(mapStateToProps, { getUsers })(Users);
