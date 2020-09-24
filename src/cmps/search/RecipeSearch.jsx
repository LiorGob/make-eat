import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRecipes, resetIngredientSearch } from '../../store/actions/searchActions';
import TextField from '@material-ui/core/TextField';
import { OutlinedInput } from '@material-ui/core';
import { withRouter } from 'react-router';

class _RecipeSearch extends Component {

    state = {
        searchTerm: '',
        ingredientSearchReset: false
    }

    componentDidMount() {
        this.setState({ searchTerm: this.props.recipeSearchTerm });
    }

    componentDidUpdate(prevProps) {
        if (this.props.recipeSearchTerm !== prevProps.recipeSearchTerm) {
            this.setState({ searchTerm: this.props.recipeSearchTerm, ingredientSearchReset: false });
        }
    }
    onHandleChange = (ev) => {
        this.setState({ searchTerm: ev.target.value });
    }

    get defaultSearchTerm() {
        return (this.state.searchTerm);
    }

    onKeyUp = (ev) => {
        if (!this.state.ingredientSearchReset) {
            this.props.resetIngredientSearch();
            this.setState({ ingredientSearchReset: true })
        }
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.props.searchRecipes(this.props.recipes, this.state.searchTerm);
            this.props.history.push('/recipe');
        }
    }

    render() {
        const { placeholder } = this.props;
        return (
            <div className="name-filter">
                {/* <OutlinedInput type="text" name="title" autoComplete="off" value={this.defaultSearchTerm} */}
                 <TextField type="text" name="title" autoComplete="off" InputProps={{disableUnderline: true }}  value={this.defaultSearchTerm} 
                    /* <input type="text" name="title" autoComplete="off"  value={this.defaultSearchTerm} */
                  className="input-color"  onKeyUp={this.onKeyUp} placeholder={placeholder} onChange={this.onHandleChange} />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        recipeSearchTerm: state.searchReducer.recipeSearchTerm,
        lastRecipeSearchTerm: state.searchReducer.lastRecipeSearchTerm
    }
}

const mapDispatchToProps = {
    searchRecipes,
    resetIngredientSearch
}
export const RecipeSearch = connect(mapStateToProps, mapDispatchToProps)(withRouter(_RecipeSearch))