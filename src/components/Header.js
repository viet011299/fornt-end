import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
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
          to="/managers"
        >
          <li>Manager</li>
        </Link>
        <Link
          style={{ color: "white", textDecoration: "none", marginTop: "10px", marginRight: "40px" }}
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
    </StyledHeader>
  );
}
const StyledHeader = styled.nav`
    z-index: 1;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
`
export default Header;