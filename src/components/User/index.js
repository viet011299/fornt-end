import React from 'react'
import { Switch, useRouteMatch } from 'react-router'


function User() {
    let { path } = useRouteMatch()
    return (
        <>
        </>
        // <Switch>
        //     <Route path={path} >
        //         <Route exact path={path} component={ListMeter} />
        //         <Route path={`${path}/:id`} component={MeterInfo} />
        //     </Route>
        // </Switch>
    )
}


export default User

