import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import qs from 'qs';
import { loadRecipes } from '../store/actions/recipeActions'
import { resetSearchs, searchRecipes, searchIngredients } from '../store/actions/searchActions';
import { RecipeList } from '../cmps/recipe/RecipeList'

class _RecipeApp extends Component {

    state = {
        filterBy: {}
    }

    async componentDidMount() {
        window.scroll(0, 0);
        const qsTag = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).tag;
        const filterBy = { ...this.state.filterBy, tag: qsTag };
        this.setState({ filterBy });
        this.props.loadRecipes(filterBy);
    }

    componentWillUnmount() {
        this.props.resetSearchs();
    }

    onChange = ({ target }) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.addVal = target.value;
        this.setState(newState)
    }

    getRecipesToDisplay() {
        if (this.props.searchReady)
            return this.props.searchedRecipes;
        //this.props.searchInRecipes && 
        if (this.props.lastRecipeSearchTerm !== '') {
            this.props.searchRecipes(this.props.recipes, this.props.lastRecipeSearchTerm);
            return [];
        }
        //this.props.searchInIngredients && 
        if (this.props.lastIngredientSearchTerm !== '') {
            this.props.searchIngredients(this.props.recipes, this.props.lastIngredientSearchTerm);
            return [];
        }

        var filtered = this.props.recipes;
        if (this.state.filterBy.tag) {
            filtered = this.props.recipes.filter(recipe => {
                return recipe.tags.find(tag => tag.toLowerCase() === this.state.filterBy.tag.toLowerCase());
            })
        }
        return filtered;
    }

    render() {
        const recipes = this.getRecipesToDisplay();
        if (!recipes) return <div>Loading...</div>
        const { searchReady, recipeSearchTerm, ingredientSearchTerm, searchedRecipes } = this.props;
        return (
            <div className="main-container">
                {searchReady && ingredientSearchTerm !== '' && <h3>{searchedRecipes.length} recipe results for "{ingredientSearchTerm}"</h3>}
                {searchReady && recipeSearchTerm !== '' && <h3>{searchedRecipes.length} recipe results for "{recipeSearchTerm}"</h3>}
                {recipes && recipes.length > 0 && <RecipeList recipes={recipes} />}
                {recipes && recipes.length === 0 && <div className="no-results-msg">
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
        searchedRecipes: state.searchReducer.searchedRecipes,
        recipeSearchTerm: state.searchReducer.recipeSearchTerm,
        lastRecipeSearchTerm: state.searchReducer.lastRecipeSearchTerm,
        searchInRecipes: state.searchReducer.searchInRecipes,
        ingredientSearchTerm: state.searchReducer.ingredientSearchTerm,
        lastIngredientSearchTerm: state.searchReducer.lastIngredientSearchTerm,
        searchInIngredients: state.searchReducer.searchIngredients,
        searchReady: state.searchReducer.searchReady
    }
}
const mapDispatchToProps = {
    loadRecipes,
    resetSearchs,
    searchRecipes,
    searchIngredients
}
export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)