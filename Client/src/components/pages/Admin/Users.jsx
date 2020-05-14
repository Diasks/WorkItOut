import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../../store";
import { getUsers } from "../../../_actions/userAction";
import UserList from "./UserList";
import SearchIcon from '@material-ui/icons/Search';
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";

const Users = ({ users, loading }) => {
 
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
         <SearchIcon className="icon icon-searchicon" /> 
        <ul>
          {users === undefined ? (
             <LoadingOverlay
             active={loading}
             spinner={<PulseLoader color={"#f5af61"} />}
             styles={{
               overlay: (base) => ({
                 ...base,
                 background: "#efeeee",
               }),
             }}
           />
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
  loading: state.user.loading,
});



export default connect(mapStateToProps, { getUsers })(Users);
