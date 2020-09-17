import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getUser } from '../store/actions/userActions';
import { loadRecipes } from '../store/actions/recipeActions';
import { About } from '../cmps/user/About';
import { Favorites } from '../cmps/user/Favorites';
import { MadeIt } from '../cmps/user/MadeIt.jsx';
import { Reviews } from '../cmps/user/Reviews';
import { Orders } from '../cmps/user/Orders';
import { AddRecipe } from '../cmps/user/AddRecipe';

class _UserHome extends Component {

    state = {
        favoriteRecipes: null
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
        this.props.loadRecipes();
    }

    get favorites(){
        return this.props.recipes.filter(recipe => {
            const liked = recipe.likers.filter(user => user._id === this.props.user._id);
            return liked.length > 0;
        });
    }

    get madeIt(){
        return this.props.recipes.filter(recipe => {
            const made = recipe.makers.filter(user => user._id === this.props.user._id);
            return made.length > 0;
        });
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
                    <Route exact path="/user/:id/favorites" render={(props) => <Favorites {...props} recipes={this.favorites}/>}/>
                    <Route exact path="/user/:id/madeit" render={(props) => <MadeIt {...props} recipes={this.madeIt} />}/>
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
        user: state.userReducer.user,
        recipes: state.recipeReducer.recipes
    }
}

const mapDispatchToProps = {
    getUser,
    loadRecipes
}



export const UserHome = connect(mapStateToProps, mapDispatchToProps)(_UserHome)