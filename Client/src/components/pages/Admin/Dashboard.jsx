import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  debugger;
  return (
    <main className="main">
      <section>
        <h3>Hejsan { props.user === null || undefined ? "" : props.user.firstname }</h3>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam quos
          enim voluptates accusantium suscipit neque fugit ex voluptatem illum!
          Error ratione, aut iure laudantium vero expedita sapiente. Enim, nisi
          rem.
        </p>
        <div>
          {" "}
          <Link to="/programs">Skapa nytt program ></Link>
        </div>
        <div>
          {" "}
          <Link to="/settings">Inställningar ></Link>
        </div>
      </section>
    </main>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
