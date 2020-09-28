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
            this.setState({defaultSearchTerm: ''})
            this.props.onDoSearch();
            this.props.history.push(`/recipe?searchIngredient=${this.state.searchTerm}`);
        }
    }

    render() {
//        const { placeholder } = this.props;
        return (
            <div className="produce-filter">
                {/* <TextField className="input-color" type="text" name="ingredient" autoComplete="off" InputProps={{disableUnderline: true }} value={this.defaultSearchTerm}
                    onKeyUp={this.onKeyUp} placeholder={placeholder} onChange={this.onHandleChange} /> */}
                <TextField
                    name="title"
                    autoComplete="off"
                    type="search"
                    label="Search by ingredient"
                    //style={{ margin: 8 }}
                    placeholder="Eggs"
                    helperText="Search by an ingredient included in a recipe"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    className="input-color"
                    value={this.state.defaultSearchTerm}
                    onKeyUp={this.onKeyUp}
                    onChange={this.onHandleChange}
                />
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