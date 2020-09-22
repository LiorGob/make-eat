import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRecipes, searchIngredients } from '../../store/actions/searchActions';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';

class _IngredientSearch extends Component {

    state = {
        toList: false
    }
    onHandleChange = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.setState({ toList: true });
        }
        else {
            const { isIngredients, recipes } = this.props
            const searchTerm = ev.target.value;
            (isIngredients) ? this.props.searchIngredients(recipes, searchTerm) : this.props.searchRecipes(recipes, searchTerm);
        }
    }

    render() {
        if (this.state.toList === true) {
            return <Redirect to='/recipe' />
        }
        const { name } = this.props.isIngredients ? 'title' : 'ingredient';
        const { placeholder } = this.props
        return (
            <div className="produce-filter">
                <TextField type="text" className="name-filter" name={name} autoComplete="off"
                    onKeyUp={this.onHandleChange} placeholder={placeholder} />

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
    searchRecipes,
    searchIngredients
}

export const IngredientSearch = connect(mapStateToProps, mapDispatchToProps)(_IngredientSearch)