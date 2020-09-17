import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecipe } from '../store/actions/recipeActions'

class _RecipeDetails extends Component {

    state = {

    }

    async componentDidMount() {
        const { id } = this.props.match.params
        await this.props.getRecipe(id)

    }


    render() {
        const { recipe } = this.props
        if (!recipe) return <div>is Loading..</div>
        console.log('recipe', recipe);
        let ratingAvg = recipe.reviews.reduce((acc, a) => acc + a.rating, 0) / recipe.reviews.length
        return (
            <div className="recipe-details">
                <h2>{recipe.name}</h2>
                <p>{recipe.abstract}</p>
        <div> ⭐ {ratingAvg} Ratings | {recipe.reviews.length} Reviews | {recipe.imgs.length} Images</div>
        <div className="createdBy-recipe">
                <img  className="circle-img" src={recipe.createdBy.imgUrl} alt=""/>
                <p> by {recipe.createdBy.fullName}</p>
                </div>
                <img src={recipe.imgs} alt="" />

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