import React from "react";
import "./AppBar.scss";
import { Link } from "react-router-dom";

function AppBar() {
  return (
    <header className="app-bar">
      <Link to="/">
        <h3>Droppe-XMAS</h3>
      </Link>
    </header>
  );
}

export default AppBar;
