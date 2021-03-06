import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
// import PropTypes from 'prop-types'

import ListMeter from './ListMeter'
import MeterInfo from './MeterInfo'

function Meter() {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={path} >
        <Route exact path={path} component={ListMeter} />
        <Route path={`${path}/:id`} component={MeterInfo} />
      </Route>
    </Switch>
  )
}


export default Meter

