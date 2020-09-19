import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getRecipe } from '../store/actions/recipeActions';
import { RecipeIngredient } from '../cmps/RecipeIngredient';
import { RecipeDirection } from '../cmps/RecipeDirection'
import { recipeService } from '../services/recipeService';
import GradeIcon from '@material-ui/icons/Grade';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FacebookIcon from '@material-ui/icons/Facebook';
import ScheduleIcon from '@material-ui/icons/Schedule';


class _RecipeDetails extends Component {

    state = {

    }

    async componentDidMount() {
        const { id } = this.props.match.params
        await this.props.getRecipe(id)

    }

    getAvg = () => {
        const currRecipe = this.props.recipe
        console.log('currRecipe', currRecipe);
        return recipeService.getRatingAvg(currRecipe)
    }

    render() {
        const { recipe } = this.props
        if (!recipe) return <div>is Loading..</div>
        const ratingAvg = this.getAvg()
        return (
            <div className="recipe-details card-grid">
                <div className="absract-recipe flex column">
                    <h2>{recipe.name}</h2>
                    <p>{recipe.abstract}</p>
                    <div className="review-details flex row">
                        <GradeIcon style={{ color: '#ff385c' }} />{ratingAvg} Ratings | {recipe.reviews.length} Reviews | {recipe.imgs.length} Images</div>
                </div>
                <div className="createdBy-recipe">
                    <img className="circle-img" src={recipe.createdBy.imgUrl} alt="" />
                    <p> by {recipe.createdBy.fullName}</p>
                </div>
                <div className="btn-share flex row space-between">
                {/* <React.Fragment> */}
                    <button className="save-btn"> <Link to="/user/:id/favorites"><span><FavoriteBorderIcon fontSize="small" /></span> SAVE</Link></button>
                    <button className="share-btn"> <Link to="/user/:id/reviews"><span><FacebookIcon fontSize="small" /></span> SHARE </Link></button>
                {/* </React.Fragment> */}
                </div>
                <img src={recipe.imgs} alt="" />
                <div className="min-info flex row space-between justify-center">
                    <div><ScheduleIcon className="main-color" style={{ float: "right" }} fontSize="large" />
                    </div>
                    <div><span className="font-bold"> Prep:</span> {recipe.prepTime} min</div>
                    <div><span className="font-bold"> Total: </span>{recipe.totalTime} min</div>
                    <div><span className="font-bold">Servings:</span> {recipe.servings}</div>
                </div>
                <RecipeIngredient recipe={recipe} />
                <RecipeDirection recipe={recipe} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipe: state.recipeReducer.recipe
    }
}

const mapDispatchToProps = {
    getRecipe
}

export const RecipeDetails = connect(mapStateToProps, mapDispatchToProps)(_RecipeDetails)


// let ratingAvg = recipe.reviews.reduce((acc, a) => acc + a.rating, 0) / recipe.reviews.length
//     return (
//         <div className="recipe-card">
//             <Link to={`/recipe/${recipe._id}`}>
//                 <img src={recipe.imgs[0]} alt="" />
//                </Link>
//                 <div className="recipe-preview-txt">
//                     <h2>{recipe.name}</h2>
//                     <h3><Stars stars={ratingAvg} outOf={5} full={'#ffff00'} empty={'#E1F1FF'} stroke={'#369'} />{recipe.reviews.length}</h3>
//                     <h4>{recipe.createdBy.fullName}</h4>