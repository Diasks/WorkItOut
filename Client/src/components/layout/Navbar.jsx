import React from "react";

function Navbar() {
  return (
    <nav>
      <div className="navbar-small-screen">
        <span className="logo logo-full"></span>

        <div className="menu-wrapper-mobile">
          <input type="checkbox" className="toggle" />

          <div className="hamburger">
            <div className="bar"></div>
          </div>

          <div className="menu">
            <ul className="menu-list">
              <li className="menu-list-item">Skapa ny användare</li>
              <li className="menu-list-item">Användarlista</li>
              <li className="menu-list-item">Program</li>
              <li className="menu-list-item">FAQ</li>
              <li className="menu-list-item">Inställningar</li>
              <li className="menu-list-item">Logga ut</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="navbar-big-screen">
        <div className="logo-wrapper">
          <span className="logo logo-full"></span>
        </div>

        <div className="menu-wrapper">
          <ul className="menu-list">
            <li className="menu-list-item">IKON</li>
            <li className="menu-list-item">IKON</li>
            <li className="menu-list-item">IKON</li>
            <li className="menu-list-item">IKON</li>
            <li className="menu-list-item">IKON</li>
            <li className="menu-list-item">IKON</li>
            <li className="menu-list-item">IKON</li>
            <li className="menu-list-item">IKON</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
