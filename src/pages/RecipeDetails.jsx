import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecipe, addToFavorites, addToMadeIt } from '../store/actions/recipeActions';

import { RecipeIngredient } from '../cmps/recipe/RecipeIngredient';
import { RecipeDirection } from '../cmps/recipe/RecipeDirection'
import { recipeService } from '../services/recipeService';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PrintIcon from '@material-ui/icons/Print';
import PinterestIcon from '@material-ui/icons/Pinterest';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RatingStar from '../cmps/icons/RatingStar';
import { ImageCarousel } from '../cmps/ImageCarousel';
import LatestReviews from '../cmps/review/LatestReviews';
import { HashLink as Link } from 'react-router-hash-link';

class _RecipeDetails extends Component {

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.getRecipe(id)
    }

    getAvg = () => {
        const currRecipe = this.props.recipe
        return recipeService.getRatingAvg(currRecipe)
    }

    onAddToFavorites = () => {
        if (!this.props.loggedInUser) {
            this.props.history.push('/user/login');
        }
        else {
            this.props.addToFavorites(this.props.recipe, this.props.loggedInUser);
        }
    }

    onAddToMadeIt = () => {
        if (!this.props.loggedInUser) {
            this.props.history.push('/user/login');
        }
        else {
            this.props.addToMadeIt(this.props.recipe, this.props.loggedInUser);
        }
    }

    render() {
        const { recipe, loggedInUser } = this.props;
        if (!recipe) return <div>Loading...</div>
        const ratingAvg = this.getAvg()
        const isOwner = loggedInUser && loggedInUser._id === recipe.createdBy._id;
        return (
            <div className="main-container">
                <div className="recipe-details">
                    <div className="absract-recipe flex column">
                        <h1>{recipe.name}</h1>
                        <div className="review-details flex row pipe">
                            <RatingStar />
                            <span>{`${ratingAvg}(${recipe.reviews.length} Ratings)`} </span>
                            <span><Link to={`/recipe/${recipe._id}#latest-review-list`} className="color-underline">{recipe.reviews?.length} Reviews</Link></span>
                            <span>{recipe.imgs.length} Images</span>
                        </div>
                        <p>{recipe.abstract}</p>
                    </div>
                    <div className="createdBy-recipe flex row">
                        <div><img className="circle-img" src={recipe.createdBy?.imgUrl} alt={`${recipe.createdBy?.fullName} profile`} /></div>
                        <div className="createdBy-name">By {recipe.createdBy?.fullName}</div>
                    </div>
                    <div className="flex row">
                        <div className="share-btns">
                            <div className="docked">
                                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group" orientation="vertical">
                                    <Button onClick={this.onAddToFavorites} startIcon={<FavoriteBorderIcon />}>Save</Button>
                                    <Button startIcon={<PrintIcon />}>Print</Button>
                                    <Button startIcon={<PinterestIcon />}>Pin</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                        <div className="recipe-content-container">
                            <div className="flex row">
                                <div className="gallery">
                                    <ImageCarousel images={recipe.imgs} recipeName={recipe.name} />
                                </div>
                                <aside>
                                    <div className="min-info">
                                        <div className="icon-wrapper"><ScheduleIcon className="main-color" style={{ float: "right" }} fontSize="large" />
                                        </div>
                                        <div><span className="font-bold"> Prep:</span> {recipe.prepTime} min</div>
                                        <div><span className="font-bold"> Total: </span>{recipe.totalTime} min</div>
                                        <div><span className="font-bold">Servings:</span> {recipe.servings}</div>
                                    </div>
                                    {isOwner && <Link to={`/recipe/edit/${recipe._id}`}><button>Edit your recipe</button></Link>}
                                </aside>
                            </div>
                            <RecipeIngredient recipe={recipe} selectIngredient={this.selectIngredient} />
                            <RecipeDirection recipe={recipe} onAddToMadeIt={this.onAddToMadeIt} />
                            <LatestReviews recipe={recipe} count="1"/>
                            {/* <ReviewDialog recipe={recipe} doOpen={this.state.openReviewDialog}/> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipe: state.recipeReducer.recipe,
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    getRecipe,
    addToFavorites,
    addToMadeIt
}

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(_RecipeDetails)
