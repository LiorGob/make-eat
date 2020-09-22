import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import routes from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Notification } from './cmps/Notification.jsx';

export class App extends Component {
    state = {
        rootClass: ''
    }
    componentDidMount() {
        window.scroll(0, 0);
    }
    setRootClass = (className) => {
        this.setState({rootClass: ' '+className});
    }
    render() {
        return (
            <div className={`app${this.state.rootClass}`}>
                <AppHeader />
                {/* <main className="main-container"> */}
                <main >
                    <Switch>
                        <Route key="/" exact path="/" render={(props) => <Home {...props} setRootClass={this.setRootClass} />} />
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <AppFooter />
                <Notification />
            </div>
        )
    }
}
