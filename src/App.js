import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Fotter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Meter from "./components/Meter";
import MeterInfo from "./components/Meter/MeterInfo"
import Manager from "./components/Manager"
import { Container } from "@material-ui/core";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <StyledContainer maxWidth="lg" >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/meters" component={Meter} />
            <Route path="/meter/:id" component={MeterInfo}/>
            <Route path="/manager" component={Manager} />
          </Switch>
        </StyledContainer >
        <Footer />
      </div>
    </Router>
  );
}
const StyledContainer = styled(Container)`
    min-height:595px;
`
export default App;
