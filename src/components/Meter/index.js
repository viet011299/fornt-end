import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

import ListMeter from './ListMeter'
import MeterInfo from './MeterInfo'

function Meter(props) {
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

// Meter.propTypes = {

// }

export default Meter

