import React from 'react';
import {  Route, useRouteMatch, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Detail from './Detail';
import ListBuilding from './ListBuilding';
import ListRoom from './ListRoom';

export default function Manger() {
  let { path } = useRouteMatch();
  return (
    <StyledLayout>
      <Switch>
        <Route exact path={path} component={ListBuilding}/> 
        <Route path={`${path}/:id`} component={Detail} />
        <Route path={`${path}/room/:id`} component={ListRoom} />
      </Switch>
    </StyledLayout>
      
  );
}
const StyledLayout= styled.div`
margin-top: 20px;
`
