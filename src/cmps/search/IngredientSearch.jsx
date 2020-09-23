import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchIngredients, resetRecipeSearch } from '../../store/actions/searchActions';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';

class _IngredientSearch extends Component {

    state = {
        searchTerm: ''
        , recipeSearchReset: false
    }

    componentDidMount() {
        this.setState({ searchTerm: this.props.ingredientSearchTerm });
    }

    componentDidUpdate(prevProps) {
        if (this.props.ingredientSearchTerm !== prevProps.ingredientSearchTerm) {
            this.setState({ searchTerm: this.props.ingredientSearchTerm, recipeSearchReset: false });
        }
    }
    onHandleChange = (ev) => {
        this.setState({ searchTerm: ev.target.value });
    }

    get defaultSearchTerm() {
        return (this.state.searchTerm);
    }

    onKeyUp = (ev) => {
        if (!this.state.recipeSearchReset) {
            this.props.resetRecipeSearch();
            this.setState({ recipeSearchReset: true });
        }
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.props.searchIngredients(this.props.recipes, this.state.searchTerm);
            this.props.history.push('/recipe');
        }
    }

    render() {
        const { placeholder } = this.props;
        return (
            <div className="produce-filter">
                <TextField type="text" name="ingredient" autoComplete="off" value={this.defaultSearchTerm}
                    onKeyUp={this.onKeyUp} placeholder={placeholder} onChange={this.onHandleChange} />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        ingredientSearchTerm: state.searchReducer.ingredientSearchTerm,
        lastIngredientSearchTerm: state.searchReducer.lastIngredientSearchTerm
    }
}

const mapDispatchToProps = {
    searchIngredients,
    resetRecipeSearch
}
export const IngredientSearch = connect(mapStateToProps, mapDispatchToProps)(withRouter(_IngredientSearch))