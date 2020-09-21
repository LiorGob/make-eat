import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
import { Notification } from './cmps/Notification.jsx';

export function App() {
    return (
        <div className="app">
            <AppHeader />
            {/* <main className="main-container"> */}
            <main >
                <Switch>
                    {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                </Switch>
            </main>
            {/* <AppFooter /> */}
            <Notification/>
        </div>
    )
}
