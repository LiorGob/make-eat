import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getRecipe, addToFavorites, addToMadeIt } from '../store/actions/recipeActions';

import { RecipeIngredient } from '../cmps/RecipeIngredient';
import { RecipeDirection } from '../cmps/RecipeDirection'
import { recipeService } from '../services/recipeService';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PrintIcon from '@material-ui/icons/Print';
import PinterestIcon from '@material-ui/icons/Pinterest';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RatingStar from '../cmps/RatingStar';
import { ImageCarousel } from '../cmps/ImageCarousel';

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
        if (!recipe) return <div>is loading..</div>
        const ratingAvg = this.getAvg()
        return (
            <div className="main-container">
                <div className="recipe-details">
                    <div className="absract-recipe flex column">
                        <h1>{recipe.name}</h1>
                        <div className="review-details flex row pipe">
                            <RatingStar />
                            <span>{`${ratingAvg}(${recipe.reviews.length} Ratings)`} </span>
                            <span><Link to={`/recipe/${recipe._id}/review`} className="color-underline">{recipe.reviews?.length} Reviews</Link></span>
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
                            {/* <Link to="/user/myprofile/favorites"><span className="btn action-btn"><FavoriteBorderIcon fontSize="small" /><span>Save</span></span></Link> */}
                            {/* <button className="share-btn"> <Link to="/user/:id/reviews"><span><FacebookIcon fontSize="small" /></span> SHARE </Link></button> */}
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
                                    {loggedInUser && loggedInUser._id === recipe.createdBy._id && 
//                                     <Button variant="outlined" color="secondary" onClick={setToOrderList} endIcon={<DoneAllIcon style={{ color: '#ff385c' }} />} className="recipe-details-btn">
//                                             Add {numOfINgredients === 0 ? 'All' : numOfINgredients} Ingredients To Shopping Cart
// </Button>
                                    <Link to={`/recipe/edit/${recipe._id}`}><button>Edit your recipe</button></Link>}
                                </aside>
                            </div>
                            <RecipeIngredient recipe={recipe} selectIngredient={this.selectIngredient} />
                            <RecipeDirection recipe={recipe} onAddToMadeIt={this.onAddToMadeIt} />
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
