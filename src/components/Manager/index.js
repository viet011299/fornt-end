import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Detail from './Detail';
import ListBuilding from './ListBuilding';
import ListRoom from './ListRoom';

export default function Manger() {
  let { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={path} >
          <Route exact path={path} component={ListBuilding} />
          <Route path={`${path}/:id`} >
            <Route exact path={`${path}/:id`} component={Detail} />
            <Route path={`${path}/:id/room`} component={ListRoom} />
          </Route>

        </Route>
      </Switch>
    </>

  );
}

