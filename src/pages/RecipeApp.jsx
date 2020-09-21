import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { RecipeList } from '../cmps/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions'
import qs from 'qs';
import { setFilteredRecipes } from '../store/actions/filteredRecipeActions'
import TextField from '@material-ui/core/TextField';
import { IngredientSearch } from '../cmps/IngredientSearch'
class _RecipeApp extends Component {

    state = {
        filterBy: {},
        filterRecipeList: [],
        filteredRecipes: []
    }


    async componentDidMount() {
        const { recipes } = this.props
        const qsTag = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).tag;
        const filterBy = { ...this.state.filterBy, tag: qsTag };
        this.setState({ filterBy });
        await this.props.loadRecipes(filterBy)
        this.props.setFilteredRecipes(recipes)
    }

    onChange = ({ target }) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.addVal = target.value;
        this.setState(newState)
    }

    getRecipesToDisplay(recipes) {
        var filtered = recipes;
        if (this.state.filterBy.tag) {
            filtered = recipes.filter(recipe => {
                return recipe.tags.find(tag => tag.toLowerCase() === this.state.filterBy.tag.toLowerCase());
            })
        }
        return filtered;
    }

    render() {
        if (!this.props.recipes) return <div>Loading...</div>
        const recipes = this.getRecipesToDisplay(this.props.recipes)
        return (

            <div className="main-container">
                <div className="search-recipe">
                    <TextField placeholder="Search produce"><IngredientSearch filterField={"name"} isIngredients getFilterList={(filterRecipeList) => this.props.setFilteredRecipes(filterRecipeList)} /></TextField>

                    <TextField className="recipe-search" placeholder="Search recipe" ><IngredientSearch filterField={"name"} getFilterList={(filterRecipeList) => this.props.setFilteredRecipes(filterRecipeList)} /></TextField>
                    {/* <RecipeList recipes={this.props.filteredRecipes} /> */}
                </div>
                {recipes.length > 0 && <RecipeList recipes={recipes} />}
                {recipes.length === 0 && <div className="no-results-msg">
                    <div>Sorry! No results in this category. Please try a different search criteria</div>
                    <div className="nav"><Link to="/" className="btn btn-small">Go to Home page</Link></div>
                </div>}

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        filterBy: state.produceReducer.filterBy,
        filteredRecipes: state.filteredRecipeReducer.filteredRecipes
    }
}

const mapDispatchToProps = {
    loadRecipes,
    setFilteredRecipes
}

export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)