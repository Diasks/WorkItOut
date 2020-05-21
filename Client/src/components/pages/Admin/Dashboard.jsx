import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getUserProfile } from "../../../_actions/userAction";
import { useEffect } from "react";
import store from "../../../store";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Dashboard = ({ auth: { admin }, selectedUser }) => {
  useEffect(() => {
    store.dispatch(getUserProfile());
  }, []);

  const displayDashboard = (
    <section>
      <h3>
        Hejsan{" "}
        {selectedUser.firstname === null || undefined
          ? ""
          : selectedUser.firstname}
      </h3>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam quos
        enim voluptates accusantium suscipit neque fugit ex voluptatem illum!
        Error ratione, aut iure laudantium vero expedita sapiente. Enim, nisi
        rem.
      </p>
      <div>
        {" "}
        <Link to="/create-program">
          Skapa nytt program{" "}
          <ArrowForwardIosIcon className="icon icon-arrowforwardiosicon" />{" "}
        </Link>
      </div>
      <div>
        {" "}
        <Link to="/settings">
          Inställningar{" "}
          <ArrowForwardIosIcon className="icon icon-arrowforwardiosicon" />{" "}
        </Link>
      </div>
    </section>
  );

  const redirectUser = <Redirect to="/overview" />;

  return (
    <main className="main">
      {admin === "true" || admin === true ? displayDashboard : redirectUser}
    </main>
  );
};

const mapStateToProps = (state) => ({
  selectedUser: state.user.selectedUser,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserProfile })(Dashboard);
