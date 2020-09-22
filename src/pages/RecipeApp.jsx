import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import qs from 'qs';
import { loadRecipes } from '../store/actions/recipeActions'
import { RecipeList } from '../cmps/recipe/RecipeList'

class _RecipeApp extends Component {
    state = {
        filterBy: {}
    }
    componentDidMount() {
        window.scroll(0, 0);
        const qsTag = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).tag;
        const filterBy = { ...this.state.filterBy, tag: qsTag };
        this.setState({ filterBy });
        this.props.loadRecipes(filterBy);
    }
    onChange = ({ target }) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.addVal = target.value;
        this.setState(newState)
    }
    getRecipesToDisplay() {
        if (this.props.searchedRecipes && this.props.searchedRecipes.length > 0) {
            console.log(this.props.searchedRecipes);
            return this.props.searchedRecipes;
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
        if (!this.props.recipes) return <div>Loading...</div>
        const recipes = this.getRecipesToDisplay();
        const { searchTerm, searchedRecipes } = this.props;
        return (
            <div className="main-container">
                {searchTerm && searchedRecipes && <h3>{searchedRecipes.length} recipe results for "{searchTerm}"</h3>}
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
        searchTerm: state.searchReducer.searchTerm
    }
}
const mapDispatchToProps = {
    loadRecipes
}
export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)