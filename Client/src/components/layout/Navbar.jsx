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
          <Link to="">Skapa ny användare</Link>
        </li>
        <li className="menu-list-item">
          <Link to="">Användarlista</Link>
        </li>
        <li className="menu-list-item">
          <Link to="">Program</Link>
        </li>
        <li className="menu-list-item">
          <Link to="">FAQ</Link>
        </li>
        <li className="menu-list-item">
          <Link to="">Inställningar</Link>
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
            <Link to="">Skapa ny användare</Link>
          </li>
          <li className="menu-list-item">
            <Link to="">Användarlista</Link>
          </li>
          <li className="menu-list-item">
            <Link to="">Program</Link>
          </li>
          <li className="menu-list-item">
            <Link to="">FAQ</Link>
          </li>
          <li className="menu-list-item">
            <Link to="">Inställningar</Link>
          </li>
          <li className="menu-list-item">
            <button onClick={logout}>Logga ut</button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <nav>
      <div className="navbar-small-screen">
        <span className="logo logo-full"></span>
        {!loading && <Fragment>{isAuthenticated ? menuMobile : null}</Fragment>}
      </div>

      <div className="navbar-big-screen">
        <div className="logo-wrapper">
          <span className="logo logo-full"></span>
        </div>
        {!loading && <Fragment>{isAuthenticated ? menu : null}</Fragment>}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
