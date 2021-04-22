import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Fotter";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Meter from "./components/Meter";
import Manager from "./components/Manager"
import User from "./components/User"
import { Container } from "@material-ui/core";
import styled from "styled-components";
import Login from "./components/Login";

import My404Component from "./components/My404Component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess } from "../src/store/user"

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { back: true } }} />}
    />
  )
}

function LoginRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { back: true } }} />}
    />
  )
}

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useSelector(state => state.user)
  useEffect(() => {
    if (sessionStorage.id) {
      const data = loginSuccess({
        id: sessionStorage.id,
        name: sessionStorage.name
      })
      dispatch(data)
    }
  }, [dispatch])
  useEffect(() => {
    if (sessionStorage.id) {
      const data = loginSuccess({
        id: sessionStorage.id,
        name: sessionStorage.name
      })
      dispatch(data)
    }
    setIsLoading(false)
  }, [])
  return (
    <Router>
      <div>
        <Header />
        {!isLoading &&
          (
            <StyledContainer maxWidth="lg" >
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute authed={user} path="/meters" component={Meter} />
                <PrivateRoute authed={user} path="/managers" component={Manager} />
                <LoginRoute authed={!user} path="/login" component={Login} />
                <Route path='*' exact component={My404Component} />
              </Switch>
            </StyledContainer >
          )

        }

        <Footer />
      </div>
    </Router>
  );
}
const StyledContainer = styled(Container)`
  margin-top:100px;
  margin-bottom:120px;
  min-height:900px;
`
export default App;
