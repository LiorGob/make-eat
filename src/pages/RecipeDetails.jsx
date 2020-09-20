import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getRecipe } from '../store/actions/recipeActions';
import { RecipeIngredient } from '../cmps/RecipeIngredient';
import { RecipeDirection } from '../cmps/RecipeDirection'
import { recipeService } from '../services/recipeService';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FacebookIcon from '@material-ui/icons/Facebook';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RatingStar from '../cmps/RatingStar';
// import GridList from '@material-ui/core/GridList';
// <GridList cellHeight={160} className={classes.gridList} cols={3}>
// {tileData.map((tile) => (
//   <GridListTile key={tile.img} cols={tile.cols || 1}>
//     <img src={tile.img} alt={tile.title} />
//   </GridListTile>
// ))}
// </GridList>


class _RecipeDetails extends Component {

    async componentDidMount() {
        const { id } = this.props.match.params
        await this.props.getRecipe(id)

    }

    getAvg = () => {
        const currRecipe = this.props.recipe
        // console.log('currRecipe', currRecipe);
        return recipeService.getRatingAvg(currRecipe)
    }
    render() {
        const { recipe, loggedInUser } = this.props;
        if (!recipe) return <div>is loading..</div>
        const ratingAvg = this.getAvg()
        return (
            <div className="recipe-details card-grid">
                {loggedInUser && loggedInUser._id === recipe.createdBy._id && <Link to={`/recipe/edit/${recipe._id}`}><button>Edit</button></Link>}
                <div className="absract-recipe flex column">
                    <h1>{recipe.name}</h1>
                    <p>{recipe.abstract}</p>
                    <div className="review-details pipe">
                        <span><RatingStar />{ratingAvg} ({recipe.reviews.length} Ratings)</span>
                        <span><Link to={`/recipe/${recipe._id}/review`}>{recipe.reviews?.length} Reviews</Link></span>
                        <span>{recipe.imgs.length} Images</span>
                    </div>
                </div>
                <div className="createdBy-recipe">
                    <img className="circle-img" src={recipe.createdBy?.imgUrl} alt="" />
                    <p> by {recipe.createdBy?.fullName}</p>
                </div>
                <div className="btn-share flex row space-between">
                    {/* <React.Fragment> */}
                    <button className="save-btn"> <Link to="/user/:id/favorites"><span><FavoriteBorderIcon fontSize="small" /></span> SAVE</Link></button>
                    <button className="share-btn"> <Link to="/user/:id/reviews"><span><FacebookIcon fontSize="small" /></span> SHARE </Link></button>
                    {/* </React.Fragment> */}
                </div>
                <img src={recipe.imgs[0]} alt="" />
                <div className="min-info flex row space-between justify-center">
                    <div><ScheduleIcon className="main-color" style={{ float: "right" }} fontSize="large" />
                    </div>
                    <div><span className="font-bold"> Prep:</span> {recipe.prepTime} min</div>
                    <div><span className="font-bold"> Total: </span>{recipe.totalTime} min</div>
                    <div><span className="font-bold">Servings:</span> {recipe.servings}</div>
                </div>
                <RecipeIngredient recipe={recipe} selectIngredient={this.selectIngredient} />
                <RecipeDirection recipe={recipe} />
                {/* <ReviewDialog recipe={recipe} doOpen={this.state.openReviewDialog}/> */}

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
    getRecipe
}

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(_RecipeDetails)
