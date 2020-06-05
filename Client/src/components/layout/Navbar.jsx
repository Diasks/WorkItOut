import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../_actions/authAction";

const Navbar = ({ auth: { isAuthenticated, loading, admin }, logout }) => {
  const userLinks = (
    <ul className="menu-list">
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/overview">
          Överblick
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/profile">
          Profil
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/challenges">
          Anta utmaning
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/faq?page=1">
          FAQ
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/settings">
          Inställningar
        </NavLink>
      </li>
      <li className="menu-list-item">
        <button onClick={logout}>Logga ut</button>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul className="menu-list">
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/dashboard">
          Överblick
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/profile">
          Profil
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/create-user">
          Skapa ny användare
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/users">
          Användarlista
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/programs">
          Program
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/faq?page=1">
          FAQ
        </NavLink>
      </li>
      <li className="menu-list-item">
        <NavLink activeClassName="is-active" to="/settings">
          Inställningar
        </NavLink>
      </li>
      <li className="menu-list-item">
        <button onClick={logout}>Logga ut</button>
      </li>
    </ul>
  );

  const menu = (
    <div className="menu-wrapper">
      {admin === "true" || admin === true ? adminLinks : userLinks}
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
          {admin === "true" || admin === true ? adminLinks : userLinks}
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
