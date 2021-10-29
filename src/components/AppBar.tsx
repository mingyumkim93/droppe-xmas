import React from "react";
import "./AppBar.scss";
import { Link } from "react-router-dom";

function AppBar() {
  return (
    <div className="app-bar">
      <Link to="/">
        <h3>Droppe-XMAS</h3>
      </Link>
    </div>
  );
}

export default AppBar;
