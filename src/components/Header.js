import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../store/user";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function Header() {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const history = useHistory()
  const handleLogout = () => {
    dispatch(logoutSuccess())
    localStorage.clear()
    history.push("/login")
  }
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
          to="/manager"
        >
          <li>Manager Building</li>
        </Link>
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px",
          }}
          to="/manager-meter"
        >
          <li>Manager Meter</li>
        </Link>
        {user &&
          <Link
            style={{ color: "white", textDecoration: "none", marginTop: "10px", marginRight: "40px" }}
            to="/user"
          >
            <li>{user.name}</li>
          </Link>
        }

        {!user && <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px"
          }}
          to="/Login"
        >
          <li>Login</li>
        </Link>
        }

        {user &&
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              marginTop: "10px",
            }}
            onClick={handleLogout}
          >
            <li>Logout</li>
          </Link>
        }

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
    justify-content: space-around;
`
export default Header;