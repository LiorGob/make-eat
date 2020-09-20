import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RecipeList } from '../cmps/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions'
import { loadProduces } from '../store/actions/produceActions'
import { FilterComponent } from '../cmps/FilterComponent'


class _RecipeApp extends Component {

    state = {
        filterBy: '',
        filterProduceList: [],
        filterRecipeList: []
    }

    async componentDidMount() {
        await this.props.loadRecipes()
        await this.props.loadProduces()
        const {recipes,produces}=this.props
        this.setState({filterProduceList:produces,filterRecipeList:recipes})
    }

    // loadProduces = () => {
    //     this.props.loadProduces(null)
    // }

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
                <FilterComponent filterField={"name"} isIngredients getFilterList={(filterRecipeList) => this.setState({ filterRecipeList })} list={recipes} placeholder="Search produce" />
                <FilterComponent filterField={"name"} getFilterList={(filterRecipeList) => this.setState({ filterRecipeList })} list={recipes} placeholder="Search recipe" />
                <RecipeList recipes={this.state.filterRecipeList} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        produces: state.produceReducer.produces,
        filterBy: state.produceReducer.filterBy,
    }
}

const mapDispatchToProps = {
    loadRecipes,
    loadProduces
}

export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)