import React from "react";
import "./AppBar.scss";
import { Link } from "react-router-dom";

function AppBar() {
  return (
    <header className="app-bar">
      <Link to="/">
        <h3>Wish list approval</h3>
      </Link>
    </header>
  );
}

export default AppBar;
