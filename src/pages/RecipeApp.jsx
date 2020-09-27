import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import qs from 'qs';
import { loadRecipes } from '../store/actions/recipeActions'
import { resetSearchs, searchRecipes, searchIngredients, searchTag } from '../store/actions/searchActions';
import { RecipeList } from '../cmps/recipe/RecipeList'

class _RecipeApp extends Component {
    state = {}

    async componentDidMount() {
        window.scroll(0, 0);
        await this.props.loadRecipes();
        this.readQS();
    }

    readQS() {
        const sr = this.queryString("searchRecipe")
        const si = this.queryString("searchIngredient");
        const tag = this.queryString("tag");
        if (sr) this.setState({ searchRecipeTerm: sr }, () => {
            if (!this.props.recipes) return;
            this.props.searchRecipes(this.props.recipes, this.state.searchRecipeTerm)
        });
        else if (si) this.setState({ searchIngredientTerm: si }, () => {
            if (!this.props.recipes) return;
            this.props.searchIngredients(this.props.recipes, this.state.searchIngredientTerm)
        });
        else if (tag) this.setState({ searchTag: tag }, () => {
            if (!this.props.recipes) return;
            this.props.searchTag(this.props.recipes, tag);
        })
    }

    queryString = (name) => {
        return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })[name];
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
        return (this.state.searchRecipeTerm || this.state.searchIngredientTerm || this.state.searchTag) ? this.props.searchedRecipes : this.props.recipes
    }

    capitalizeFirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const recipes = this.getRecipesToDisplay();
        if (!recipes) return <div>Loading...</div>
        const { searchReady, recipeSearchTerm, ingredientSearchTerm, searchedRecipes, tagSearch } = this.props;
        return (
            <div className="main-container">
                {searchReady && ingredientSearchTerm !== '' && <h3>{searchedRecipes.length} recipe results for "{ingredientSearchTerm}"</h3>}
                {searchReady && recipeSearchTerm !== '' && <h3>{searchedRecipes.length} recipe results for "{recipeSearchTerm}"</h3>}
                {tagSearch !== '' && searchedRecipes.length && <h2>Our recipes for {this.capitalizeFirst(tagSearch)} cuisine</h2>}
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
        searchedRecipes: state.searchReducer.searchedRecipes,
        recipeSearchTerm: state.searchReducer.recipeSearchTerm,
        ingredientSearchTerm: state.searchReducer.ingredientSearchTerm,
        searchReady: state.searchReducer.searchReady,
        tagSearch: state.searchReducer.tagSearch
    }
}
const mapDispatchToProps = {
    loadRecipes,
    resetSearchs,
    searchRecipes,
    searchIngredients,
    searchTag
}
export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)