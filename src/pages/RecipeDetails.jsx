import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpoonIcon from '../cmps/icons/SpoonIcon';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InstagramIcon from '@material-ui/icons/Instagram';
// import PrintIcon from '@material-ui/icons/Print';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GroupIcon from '@material-ui/icons/Group';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import SecondaryButton from '../cmps/buttons/SecondaryButton';
// import ScheduleIcon from '@material-ui/icons/Schedule';
import RatingStar from '../cmps/icons/RatingStar';
import { ImageCarousel } from '../cmps/ImageCarousel';
import { HashLink as Link } from 'react-router-hash-link';

import { RecipeIngredient } from '../cmps/recipe/RecipeIngredient';
import { RecipeDirection } from '../cmps/recipe/RecipeDirection'
import { recipeService } from '../services/recipeService';
import { getRecipe, addToFavorites, addToMadeIt } from '../store/actions/recipeActions';
import { LatestReviews } from '../cmps/review/LatestReviews';

class _RecipeDetails extends Component {

    state = {

    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getRecipe(id);
        const randomReviewsNum = this.getRandomNum();
        const reviewsNum = randomReviewsNum * 20
        this.setState({ reviewsNum })

    }

    getAvg = () => {
        const currRecipe = this.props.recipe
        return recipeService.getRatingAvg(currRecipe)
    }

    getRandomNum = () => {
        return recipeService.getRandomInt(1, 10)
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
        const { reviewsNum } = this.state
        // const isOwner = loggedInUser && loggedInUser._id === recipe.createdBy._id;
        return (
            <div className="main-container">
                <div className="recipe-details">
                    <div className="absract-recipe flex column">
                        <h1>{recipe.name}</h1>
                        <div className="review-details flex row padding-bottom">
                            <RatingStar />
                            <span><Link to={`/recipe/${recipe._id}#latest-review-list`} className="color-underline font-bold">{`${ratingAvg}(${reviewsNum})`}</Link></span>
                        </div>
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
                        <div className="share-btns flex column justify-center">
                            {/* <div className="docked"> */}
                                {/* <ButtonGroup className="btn btn-primary" size="large" color="secondary"  aria-label="large outlined primary button group" orientation="vertical"> */}
                                    <Button className="btn btn-primary" variant="outlined" color="secondary" onClick={this.onAddToFavorites} startIcon={<FavoriteBorderIcon className="save-icon"/>}>Save</Button>
                                    <div className="social-btn flex row justify-center space-between">
                                    <Button className="btn btn-primary"  variant="outlined" color="secondary"  startIcon={<FacebookIcon className="relative-left"/>}></Button>
                                    <Button className="btn btn-primary"  variant="outlined" color="secondary" startIcon={<PinterestIcon className="relative-left" />}></Button>
                                    <Button className="btn btn-primary"  variant="outlined" color="secondary" startIcon={<InstagramIcon className="relative-left"/>}></Button>
                                    </div>
                                    <Button className="made-it btn btn-primary" variant="outlined" color="secondary" startIcon={<SpoonIcon />} onClick={this.onAddToMadeIt}>
                                        I Made It
                                       </Button>
                            {/* <SecondaryButton text="I Made It" classes="made-it" onClick={this.onAddToMadeIt} startIcon={<SpoonIcon />}/> */}
                                {/* </ButtonGroup> */}
                            {/* </div> */}
                        </div>

                        <RecipeIngredient recipe={recipe} selectIngredient={this.selectIngredient} />
                        <RecipeDirection recipe={recipe} /*onAddToMadeIt={this.onAddToMadeIt}*/ />
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
    addToMadeIt
}

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(_RecipeDetails)
