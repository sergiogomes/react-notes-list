import React from "react";
import classNames from "classnames";

const NavigationDrawer = ({ isOpen, onCloseMenu }) => (
  <div
    className={classNames("navigation-drawer", {
      "navigation-drawer--open": isOpen
    })}
  >
    <div className="navigation-drawer__head">
      <button className="navigation-drawer__head__button" onClick={onCloseMenu}>
        <i className="material-icons">close</i>
      </button>
    </div>
    <div className="navigation-drawer__menu">
      <button className="navigation-drawer__menu__item">
        <i className="material-icons">note</i> Notes
      </button>
      <button className="navigation-drawer__menu__item">
        <i className="material-icons">info</i> About
      </button>
    </div>
  </div>
);

export default NavigationDrawer;
