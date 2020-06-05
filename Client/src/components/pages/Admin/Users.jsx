import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../../store";
import { getUsers } from "../../../_actions/userAction";
import UserList from "./UserList";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import { Redirect } from "react-router-dom";
import GoBackButton from "../../layout/GoBackButton";

const Users = ({ auth: { admin }, loading, users }) => {
  useEffect(() => {
    store.dispatch(getUsers());
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchUsers = users;

  useEffect(() => {
    if (searchUsers !== undefined) {
      const results = searchUsers.filter((user) =>
        user.firstname.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  /**
   * Metod som används för att hantera när värdet av ett element har ändrats
   *
   * @param {*} e Det event som gjorde att denna funktion anropades
   */
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const displayUsers = (
    <section>
      <h2 className="heading rose no-margin">Användarlista</h2>
      <div className="search-wrap">
        <input
          className="input input-search"
          type="text"
          name="#"
          value={searchTerm}
          placeholder="Sök användare"
          onChange={handleChange}
        />
      </div>
      <ul className="centered-wrap">
        {users &&
          searchResults.length < 1 &&
          users.map((user, index) => <UserList key={index} user={user} />)}
      </ul>
      <ul>
        {searchResults.map((user, index) => (
          <UserList key={index} user={user} />
        ))}
      </ul>
      <GoBackButton />
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
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  loading: state.user.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers })(Users);
