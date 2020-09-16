import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RecipeList } from '../cmps/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions'

class _RecipeApp extends Component {

    state = {

    }

    componentDidMount() {
        this.props.loadRecipes()
    }




    render() {
        const { recipes } = this.props
        console.log('recipes', recipes);
        return (
            <div>

                <RecipeList recipes={recipes} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes
    }
}

const mapDispatchToProps = {
    loadRecipes,
}



export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)