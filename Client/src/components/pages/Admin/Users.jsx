import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../../store";
import { getUsers } from "../../../_actions/userAction";
import UserList from "./UserList";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import { Redirect } from "react-router-dom";
import GoBackButton from "../../layout/GoBackButton";

const Users = ({ auth: { admin }, users, loading }) => {
  useEffect(() => {
    store.dispatch(getUsers());
  }, []);

  const onSearchUsers = () => {
    console.log("search!!");
  };

  const onSubmit = () => {
    console.log("submitted!");
  };

  const displayUsers = (
    <section>
      <h2 className="heading rose no-margin">Användarlista</h2>
      <div className="search-wrap">
        <form onSubmit={onSubmit}>
          <input
            className="input input-search"
            type="text"
            name="#"
            placeholder="Sök"
          />

          <input
            type="button"
            onClick={onSearchUsers}
            className="icon icon-search"
          />
        </form>
      </div>
      <ul>
        {users &&
          users.map((user, index) => <UserList key={index} user={user} />)}
      </ul>
      <GoBackButton/>
    </section>
  );

  const redirectUser = <Redirect to="/overview" />;

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
        {admin === true || admin === "true" ? displayUsers : redirectUser}
      </main>
    </LoadingOverlay>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  loading: state.user.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers })(Users);
