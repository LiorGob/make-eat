import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { recipeService } from '../services/recipeService'
class _RecipeDetails extends Component {

    state = {
        id: '',
        // recipe: this.props
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        this.setState({...id})
        // const currRecipe = await recipeService.getById(id)
        // this.setState({ ...recipe})
    }


    render() {
        return (
            <div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes
    }
}

export const RecipeDetails = connect(mapStateToProps)(_RecipeDetails)


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