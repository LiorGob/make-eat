import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { getUser, setLoggedUserAsUser } from '../../store/actions/userActions';
import { loadRecipes, addToFavorites } from '../../store/actions/recipeActions';
import { About } from '../../cmps/user/About';
import { UserRecipesList } from '../../cmps/user/UserRecipesList';
import { UserReviews } from '../../cmps/user/UserReviews';
import { Orders } from '../../cmps/user/Orders';
import { AddRecipe } from '../../cmps/user/AddRecipe';
import { socketService } from '../../services/socketService';
import FavoritesIcon from '../../cmps/icons/FavoritesIcon';

class _UserHome extends Component {

    constructor(props) {
        super(props);
        this.navRef = React.createRef();
        this.classes = makeStyles((theme) => ({
            typography: {
                padding: theme.spacing(2),
            },
        }));
    }

    state = {
        favoriteRecipes: null,
        popoverOpen: false,
        recipeLiked: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id === 'myprofile') {
            await this.props.setLoggedUserAsUser();
            console.log('user id:', this.props.user._id);
        }
        else {
            await this.props.getUser(this.props.match.params.id);
        }
        socketService.on('LIKER ADDED', (data) => {
            const recipe = JSON.parse(data);
            console.log(recipe);
            this.setState({ popoverOpen: true, recipeLiked: recipe.name });
        })
        this.props.loadRecipes();
    }

    get favorites() {
        return this.props.recipes.filter(recipe => {
            const liked = recipe.likers.filter(user => user._id === this.props.loggedInUser._id);
            return liked.length > 0;
        });
    }

    get madeIt() {
        return this.props.recipes.filter(recipe => {
            const made = recipe.makers.filter(user => user._id === this.props.user._id);
            return made.length > 0;
        });
    }

    get reviewedRecipes() {
        let r = this.props.recipes.filter(recipe => {
            const made = recipe.reviews.filter(review => review.by._id === this.props.user._id);
            return made.length > 0;
        });
        return r;
    }

    get personalRecipes() {
        return this.props.recipes.filter(recipe => recipe.createdBy._id === this.props.user._id);
    }

    saveToFavorites = recipeId => {
        const recipe = this.props.recipes.find(recipe => recipe._id === recipeId)
        this.props.addToFavorites(recipe, this.props.loggedInUser);
    }

    handleClosePopover = () => {
        this.setState({ popoverOpen: false, recipeLiked: '' });
    }

    render() {
        if (!this.props.recipes) return;
        const { user } = this.props;
        const favs = this.favorites;
        const made = this.madeIt;
        const reviewed = this.reviewedRecipes;
        const personal = this.personalRecipes;
        let userStats = [
            { txt: 'My favorite recipes', val: favs.length },
            { txt: 'I made it', val: made.length },
            { txt: 'My reviews', val: reviewed.length },
            { txt: 'My submitted recipes', val: personal.length }
        ];

        return (
            <div className="main-container user-profile">
                <nav className="profile-subnav" ref={this.navRef}>
                    <NavLink to="./favorites">My Favorites</NavLink>
                    <NavLink to="./madeit">I Made It</NavLink>
                    <NavLink to="./reviews">My Reviews</NavLink>
                    <NavLink to="./recipes">Personal Recipes</NavLink>
                    <NavLink to="./orders">My Orders</NavLink>
                    {/* <NavLink to="./add">Submit a recipe</NavLink>
                    <NavLink to="./recipe/edit/:id?">Submit a recipe</NavLink> */}
                </nav>
                <Popover
                    open={this.state.popoverOpen}
                    anchorEl={this.navRef.current}
                    onClose={this.handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div className="user-socket-msg">
                        <div className="icon"><FavoritesIcon style={{ fontSize: 24 }} /></div>
                        <Typography className={this.classes.typography}>A user added your {this.state.recipeLiked} recipe to Favorites</Typography>
                    </div>
                </Popover>
                <div className="container">
                    <About user={{ ...user, userStats }} />
                    <Switch>
                        <Route exact path="/user/:id/favorites" render={(props) => <UserRecipesList {...props} recipes={favs} user={user} emptyText="Your Favorites list is empty yet" />} />
                        <Route exact path="/user/:id/madeit" render={(props) => <UserRecipesList {...props} recipes={made} emptyText="Your I Made It list is empty yet"/>} />
                        <Route exact path="/user/:id/reviews" render={(props) => <UserReviews {...props} user={user} recipes={reviewed} />} />
                        <Route exact path="/user/:id/recipes" render={(props) => <UserRecipesList {...props} user={user} recipes={personal} emptyText="You didn't submit any recipes yet" />} />
                        <Route exact component={Orders} path="/user/:id/orders" />
                        <Route exact component={AddRecipe} path="/user/:id/add" />
                        {/* <Route exact component={RecipeEdit} path="/recipe/edit/:id?"/> */}
                        {/* <Route exact path="/..." render={(props) => <PAGE {...props} recipes={recepies} />} /> */}
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        loggedInUser: state.userReducer.loggedInUser,
        recipes: state.recipeReducer.recipes
    }
}

const mapDispatchToProps = {
    getUser,
    setLoggedUserAsUser,
    loadRecipes,
    addToFavorites
}



export const UserHome = connect(mapStateToProps, mapDispatchToProps)(_UserHome)