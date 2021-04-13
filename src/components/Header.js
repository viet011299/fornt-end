import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
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
const StyledHeader = styled.div`
    z-index: 1;
    display:flex;
    overflow: hidden;
    position: fixed;
    top: 0;
    width:100%;
    height:70px;
    align-items: center;
    background-color: #0085FF;
    padding:10px;
`
export default Header;