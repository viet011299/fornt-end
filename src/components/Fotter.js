import React from "react";
import styled from "styled-components";
import "../App.css";

function Footer() {
  return (
    <StyledFooter>
      <div>
        Copyright © 2021 UET-VNU Live Now.
      </div>
    </StyledFooter>
  );
}
const StyledFooter = styled.footer`
position: fixed;
bottom:0;
width:100%;
z-index:1;
`
export default Footer;
