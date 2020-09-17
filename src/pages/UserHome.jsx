import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getUser } from '../store/actions/userActions'
import { About } from '../cmps/user/About';
import { Favorites } from '../cmps/user/Favorites';
import { MadeIt } from '../cmps/user/MadeIt.jsx';
import { Reviews } from '../cmps/user/Reviews';
import { Orders } from '../cmps/user/Orders';
import { AddRecipe } from '../cmps/user/AddRecipe';
//import { recipeService } from '../services/recipeService.js';
class _UserHome extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
    }

    get favorites(){
        
        
    }

    render() {
        const { user } = this.props;
        return (
            <div className="profile-subnav">
                <nav>
                    <NavLink to="./about">About Me</NavLink>|
                    <NavLink to="./favorites">My Favorites</NavLink>|
                    <NavLink to="./madeit">I Made It</NavLink>|
                    <NavLink to="./reviews">My Reviews</NavLink>|
                    <NavLink to="./orders">My Orders</NavLink>|
                    <NavLink to="./add">Submit a recipe</NavLink>|
                </nav>
                <Switch>
                    <Route exact path="/user/:id/about" render={(props) => <About {...props} user={user} />} />
                    <Route exact path="/user/:id/favorites" render={(props) => <Favorites {...props} />}/>
                    <Route exact component={MadeIt} path="/user/:id/madeit" />
                    <Route exact component={Reviews} path="/user/:id/reviews" />
                    <Route exact component={Orders} path="/user/:id/orders" />
                    <Route exact component={AddRecipe} path="/user/:id/add" />
                    {/* <Route exact path="/..." render={(props) => <PAGE {...props} recipes={recepies} />} /> */}
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {
    getUser
}



export const UserHome = connect(mapStateToProps, mapDispatchToProps)(_UserHome)