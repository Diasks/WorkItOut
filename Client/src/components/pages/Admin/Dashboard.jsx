import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const Dashboard = ({ admin }) => {
  return (
    <main className="main">
      <section>
        <h3>Dashboard</h3>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam quos
          enim voluptates accusantium suscipit neque fugit ex voluptatem illum!
          Error ratione, aut iure laudantium vero expedita sapiente. Enim, nisi
          rem.
        </p>
      </section>
    </main>
  );
};

Dashboard.propTypes = {
  admin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  admin: state.auth.admin,
});

export default connect(mapStateToProps)(Dashboard);
