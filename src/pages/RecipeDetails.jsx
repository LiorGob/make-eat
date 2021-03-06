import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpoonIcon from '../cmps/icons/SpoonIcon';
import FavoritesIcon from '../cmps/icons/FavoritesIcon';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import GroupIcon from '@material-ui/icons/Group';
import Button from '@material-ui/core/Button';
import SecondaryButton from '../cmps/buttons/SecondaryButton';
import RatingStar from '../cmps/icons/RatingStar';
import { ImageCarousel } from '../cmps/ImageCarousel';
import { HashLink as Link } from 'react-router-hash-link';

import { RecipeIngredient } from '../cmps/recipe/RecipeIngredient';
import { RecipeDirection } from '../cmps/recipe/RecipeDirection'
import { recipeService } from '../services/recipeService';
import { getRecipe, addToFavorites, addReview, saveRecipe } from '../store/actions/recipeActions';
import { LatestReviews } from '../cmps/review/LatestReviews';
import { AddReview } from '../cmps/review/AddReview';


class _RecipeDetails extends Component {

    state = {
        openAddReview: false
    }
    async componentDidMount() {
        window.scroll(0, 0);
        const { id } = this.props.match.params;
        await this.props.getRecipe(id);
        if (this.props.loggedInUser && this.props.recipe && this.props.recipe.likers) {
            let isSaved = this.props.recipe.likers.some(({ _id }) => {
                return _id === this.props.loggedInUser._id;
            });
            this.setState({ saved: isSaved });
        }
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
            this.setState({ saved: true });
        }
    }

    onAddToMadeIt = () => {
        if (!this.props.loggedInUser) {
            this.props.history.push('/user/login');
        }
        else {
            this.setState({ openAddReview: true });
        }
    }

    onCloseAddReview = () => {
        this.setState({ openAddReview: false });
    }

    onSubmitReview = (review) => {
        if (this.props.recipe.makers.find((maker) => maker._id === this.props.loggedInUser._id)) {
            this.onCloseAddReview();
            return;
        }
        let newRecipe = { ...this.props.recipe, makers: recipeService.updateRecipeUserList(this.props.recipe.makers, this.props.loggedInUser) };
        newRecipe.reviews.push(review);
        this.onCloseAddReview();
        this.props.addReview(newRecipe)
    }

    render() {
        const { recipe /*loggedInUser*/ } = this.props;
        if (!recipe) return <div>Loading...</div>
        // if (!recipe) return <img src="https://cdn.dribbble.com/users/139899/screenshots/968095/loading.gif" alt=""/>
        const ratingAvg = this.getAvg()
        const reviewsNum = recipeService.getReviewsNum(recipe._id)
        return (
            <div className="main-container">
                <div className="recipe-details">
                    <div className="absract-recipe flex column">
                        <h1>{recipe.name}</h1>
                        <div className="review-details flex row padding-bottom">
                            <RatingStar />
                            <span><Link to={`/recipe/${recipe._id}#latest-review-list`} className="color-underline font-bold">{`${ratingAvg}(${reviewsNum})`}</Link></span>
                            <span>{recipeService.getMadeByLabel(recipe._id)}</span>
                        </div>
                        {/* <div className="recipe-stats padding-bottom">
                            <span className="rating">
                                <span><RatingStar /></span>
                                <span><Link to={`/recipe/${recipe._id}#latest-review-list`} className="color-underline font-bold">{`${ratingAvg}(${reviewsNum})`}</Link></span>
                            </span>
                            <span>{recipeService.getMadeByLabel(recipe._id)}</span>
                        </div> */}
                        <div className="gallery-warapper flex row">
                            <ImageCarousel images={recipe.imgs} /*recipeName={recipe.name}*/ />
                        </div>
                        <div className="createdBy-recipe flex row">
                            <div><img className="circle-img" src={recipe.createdBy?.imgUrl} alt={`${recipe.createdBy?.fullName} profile`} /></div>
                            <h2 className="createdBy-name">Recipe By {recipe.createdBy?.fullName}</h2>
                        </div>
                        <div className="abstract"><p>{recipe.abstract}</p></div>
                    </div>
                    <div className="min-info">
                        <div className="prep-time">
                            <div className="icon-wrapper"><AlarmIcon className="main-color" fontSize="large" /></div>
                            <span className="font-bold"> Prep:</span> {recipe.prepTime} min
                            </div>
                        <div className="total-time">
                            <div className="icon-wrapper"><AlarmOnIcon className="main-color" fontSize="large" /></div>
                            <span className="font-bold"> Total: </span>{recipe.totalTime} min
                            </div>
                        <div className="servings">
                            <div className="icon-wrapper"><GroupIcon className="main-color" fontSize="large" /></div>
                            <span className="font-bold">Servings:</span> {recipe.servings}
                        </div>
                    </div>
                    {/* {isOwner && <Link to={`/recipe/edit/${recipe._id}`}><button>Edit your recipe</button></Link>} */}
                    {/* </aside> */}
                    {/* </div> */}

                    <div className="grid-container">
                        <div className="share-btns flex column border-grey">
                            {/* <div className="docked"> */}
                            <SecondaryButton onClick={this.onAddToFavorites} startIcon={<FavoritesIcon className={`save-icon ${this.state.saved && 'saved'}`} />} text={this.state.saved ? 'saved' : 'save'} />
                            {/* <Button className="btn btn-primary" color="secondary" onClick={this.onAddToFavorites} startIcon={<FavoritesIcon className={`save-icon ${this.state.saved && 'saved'}`} />} text={this.state.saved ?'saved':'save'}></Button> */}

                            <div className="social-btn flex row justify-center">
                                <Button className="btn btn-primary" color="secondary" startIcon={<FacebookIcon className="relative-left" />}></Button>
                                <Button className="btn btn-primary" color="secondary" startIcon={<PinterestIcon className="relative-left" />}></Button>
                                <Button className="btn btn-primary" color="secondary" startIcon={<InstagramIcon className="relative-left" />}></Button>
                            </div>
                            <SecondaryButton className="made-it btn btn-primary" startIcon={<div className="spoon-top"><SpoonIcon /></div>} onClick={this.onAddToMadeIt} text="I made it" />
                            {/* <Button className="btn btn-primary" color="secondary" startIcon={<SpoonIcon />} onClick={this.onAddToMadeIt} text="I made it"></Button> */}
                            {/* </div> */}
                        </div>

                        <RecipeIngredient recipe={recipe} selectIngredient={this.selectIngredient} />
                        <RecipeDirection recipe={recipe} /*onAddToMadeIt={this.onAddToMadeIt}*/ />
                        <AddReview open={this.state.openAddReview} onClose={this.onCloseAddReview} recipeId={recipe._id} onSubmitReview={this.onSubmitReview} loggedInUser={this.props.loggedInUser} />
                        <LatestReviews recipe={recipe} count="1" reviewsNum={reviewsNum} ratingAvg={ratingAvg} />
                        {/* <ReviewDialog recipe={recipe} doOpen={this.state.openReviewDialog}/> */}
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
    addReview,
    saveRecipe
}

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(_RecipeDetails)
