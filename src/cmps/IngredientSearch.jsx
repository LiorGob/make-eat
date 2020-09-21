import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadRecipes } from '../store/actions/recipeActions'

class _IngredientSearch extends Component {

    state = {
        name: ''
    }

    componentDidMount() {
        this.props.loadRecipes();
    }
    
    filterWithoutIngredient(value) {
        const { recipes, getFilterList, filterField } = this.props
        let filteredList = recipes.filter((item) => item[filterField].toLowerCase().includes(value.toLowerCase()))
        getFilterList && getFilterList(filteredList)
    }
    filterWithIngredient(value) {
    // console.log(value)
        const { recipes, getFilterList, filterField } = this.props
        if (!recipes) return;
        let filteredList = recipes.filter((recipe) => {
            let ingredients = recipe.ingredients
            for (let index in ingredients) {
                if (ingredients[index][filterField].toLowerCase().includes(value.toLowerCase())) {
                    // console.log('Found!')
                    return true
                }
            }
            return false;

        })
        console.log(filteredList)
        getFilterList && getFilterList(filteredList)
    }

    onHandleChange = ({ target }) => {
        const { isIngredients } = this.props
        const field = target.name
        const value = target.value
        if (isIngredients)
            this.filterWithIngredient(value)
        else
            this.filterWithoutIngredient(value)

        this.setState(prevState => ({ ...prevState, [field]: value }))
    }

    render() {
        const { name } = this.state
        const { placeholder } = this.props
        return (
            <div className="produce-filter">
                <input type="text" className="name-filter" name="name" autoComplete="off" value={name} onChange={this.onHandleChange} placeholder={placeholder} />

            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        filterBy: state.produceReducer.filterBy,
    }
}

const mapDispatchToProps = {
    loadRecipes
}

export const IngredientSearch = connect(mapStateToProps, mapDispatchToProps)(_IngredientSearch)