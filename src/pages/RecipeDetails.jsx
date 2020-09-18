import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getRecipe } from '../store/actions/recipeActions';

import {RecipeDirection} from '../cmps/RecipeDirection'
import { recipeService } from '../services/recipeService'
import GradeIcon from '@material-ui/icons/Grade';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FacebookIcon from '@material-ui/icons/Facebook';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DoneAllIcon from '@material-ui/icons/DoneAll';

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
                <h2>{recipe.name}</h2>
                <p>{recipe.abstract}</p>
                <div className="flex">
                    <GradeIcon style={{ color: '#ff385c' }} />{ratingAvg} Ratings | {recipe.reviews.length} Reviews | {recipe.imgs.length} Images</div>
                <div className="createdBy-recipe">
                    <img className="circle-img" src={recipe.createdBy.imgUrl} alt="" />
                    <p> by {recipe.createdBy.fullName}</p>
                </div>
                <div className="btn-share flex">
                    <button> <Link to="/user/:id/favorites"><span><FavoriteBorderIcon fontSize="small" /></span> SAVE</Link></button>
                    <button> <Link to="/user/:id/reviews"><span><FacebookIcon fontSize="small" /></span> SHARE </Link></button>
                </div>
                <img src={recipe.imgs} alt="" />

                <div className="min-info">
                    <div><ScheduleIcon className="main-color" style={{ float: "right" }} fontSize="small" /></div>
                    <div><span className="font-bold"> Prep:</span> {recipe.prepTime} min</div>
                    <div><span> Total: </span>{recipe.totalTime} min</div>
                    <div><span>Servings:</span> {recipe.servings}</div>
                </div>
                <div className="ingredients-recipe"><span>Ingredients:</span> {recipe.ingredients.map(ingredient => <li key={ingredient.produceId} ingredient={ingredient} >{ingredient.amount} {ingredient.spec ? ingredient.spec : ''} {ingredient.name}</li>)}
                    <button>Add All Ingredients To Shopping Cart <DoneAllIcon style={{ color: '#ff385c' }} /></button>
                </div>
                <RecipeDirection recipe={recipe}/>
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