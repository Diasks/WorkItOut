import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../_actions/authAction";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const menu = (
    <div className="menu-wrapper">
      <ul className="menu-list">
        <li className="menu-list-item">
          <Link to="/create-user">Skapa ny användare</Link>
        </li>
        <li className="menu-list-item">
          <Link to="/users">Användarlista</Link>
        </li>
        <li className="menu-list-item">
          <Link to="/programs">Program</Link>
        </li>
        <li className="menu-list-item">
          <Link to="/faq?page=1">FAQ</Link>
        </li>
        <li className="menu-list-item">
          <Link to="/settings">Inställningar</Link>
        </li>
        <li className="menu-list-item">
          <button onClick={logout}>Logga ut</button>
        </li>
      </ul>
    </div>
  );

  const menuMobile = (
    <div className="menu-wrapper-mobile">
      <input type="checkbox" className="toggle" />

      <div className="hamburger">
        <div className="bar"></div>
      </div>

      <div className="menu">
        <ul className="menu-list">
          <li className="menu-list-item">
            <Link to="/create-user">Skapa ny användare</Link>
          </li>
          <li className="menu-list-item">
            <Link to="/users">Användarlista</Link>
          </li>
          <li className="menu-list-item">
            <Link to="/programs">Program</Link>
          </li>
          <li className="menu-list-item">
            <Link to="/faq?page=1">FAQ</Link>
          </li>
          <li className="menu-list-item">
            <Link to="/settings">Inställningar</Link>
          </li>
          <li className="menu-list-item">
            <button onClick={logout}>Logga ut</button>
          </li>
        </ul>
      </div>
    </div>
  );

  const navBar = (
    <nav className="nav">
      <div className="navbar-small-screen">
        <span className="logo logo-full"></span>
        {!loading && <Fragment>{menuMobile}</Fragment>}
      </div>

      <div className="navbar-big-screen">
        <div className="logo-wrapper">
          <span className="logo logo-full"></span>
        </div>
        {!loading && <Fragment>{menu}</Fragment>}
      </div>
    </nav>
  );

  return <Fragment>{isAuthenticated ? navBar : null}</Fragment>;
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
