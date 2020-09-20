import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RecipeList } from '../cmps/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions'
import { IngredientSearch } from '../cmps/IngredientSearch'
import qs from 'qs';
class _RecipeApp extends Component {

    state = {
        filterBy: {},
        filterRecipeList: []
    }

    async componentDidMount() {
        const filterBy = { ...this.state.filterBy, tag: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).tag };
        this.setState(filterBy);
        await this.props.loadRecipes(filterBy);
        const {recipes,produces}=this.props
        this.setState({filterRecipeList:recipes})
    }

    onChange = ({ target }) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.addVal = target.value;
        this.setState(newState)
    }

    render() {
        const { recipes } = this.props
        if(!recipes) return <div>Loading...</div>
        return (
            <div>
                <IngredientSearch filterField={"name"} isIngredients getFilterList={(filterRecipeList) => this.setState({ filterRecipeList })} placeholder="Search produce" />
                <IngredientSearch filterField={"name"} getFilterList={(filterRecipeList) => this.setState({ filterRecipeList })} placeholder="Search recipe" />
                <RecipeList recipes={this.state.filterRecipeList} />
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

export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)