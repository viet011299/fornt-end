import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function Header() {
  return (
    <nav>
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        <div style={{ fontSize: "35px" }}>Smart Meter</div>
      </Link>
      <ul className="nav-links">
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px",
          }}
          to="/"
        >
          <li>Home</li>
        </Link>
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px",
          }}
          to="/meters"
        >
          <li>Meters</li>
        </Link>
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px",
          }}
          to="/manager"
        >
          <li>Manager</li>
        </Link>
        <Link
          style={{ color: "white", textDecoration: "none", marginTop: "10px",marginRight: "40px" }}
          to="/user"
        >
          <li>User</li>
        </Link>
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
          }}
          to="/logout"
        >
          <li>Logout</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Header;