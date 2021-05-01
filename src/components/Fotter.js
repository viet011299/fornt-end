import React from "react";
import styled from "styled-components";
import "../App.css";

function Footer() {
  return (
    <StyledFooter>

        Copyright © 2021 UET-VNU Live Now.

    </StyledFooter>
  );
}
const StyledFooter = styled.div`
    width:80%;
    display:flex;
    width:100%;
    height:100px;
    align-items: center;
    background-color: #0085FF;
    justify-content: center;
    color:#FFF;
    position: fixed;
    z-index: 1;
    bottom:0;
`
export default Footer;
