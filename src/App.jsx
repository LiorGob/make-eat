import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'
// import { AppHeader } from './cmps/AppHeader.jsx'

export  function App() {
    return (
        <div className="App">
            <header>
                {/* <AppHeader/> */}
            </header>
            <Switch>
                {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
            </Switch>
        </div>
    )
}
