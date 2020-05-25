import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getUserProfile } from "../../../_actions/userAction";
import { useEffect } from "react";
import store from "../../../store";
import LoadingOverlay from "react-loading-overlay";
import PulseLoader from "react-spinners/PulseLoader";
import UserQuantity from "./UserQuantity";

const Dashboard = ({ auth: { admin }, selectedUser, loading, users }) => {
  useEffect(() => {
    store.dispatch(getUserProfile());
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

  const displayDashboard = (
    <main className="main column less-margin">
      <section className="curved-banner">
        <div className="banner-text">
          <h2 className="heading mustard">
            Hejsan, {selectedUser && selectedUser.firstname}!
          </h2>
          <p className="label cream">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
          </p>
        </div>

        <div className="curved-banner-bottom"></div>
      </section>

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

      <section id="border" class="border-class">
        <div>
          <Link className="link-menu" to="/create-program">
            <span>Skapa nytt program</span>
            <span className="icon icon-arrow-right"></span>
          </Link>
        </div>
        <div>
          <Link className="link-menu" to="/settings">
            <span>Inställningar</span>
            <span className="icon icon-arrow-right"></span>
          </Link>
        </div>
      </section>
    </main>
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
      {admin === "true" || admin === true ? displayDashboard : redirectUser}
    </LoadingOverlay>
  );
};

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
  auth: state.auth,
  loading: state.user.loading,
  users: state.user.users,
});

export default connect(mapStateToProps, { getUserProfile })(Dashboard);
