import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RecipeList } from '../cmps/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions'
import { loadProduces } from '../store/actions/produceActions'
import { ProduceFilter } from '../cmps/produce/ProduceFilter'

class _RecipeApp extends Component {

    state = {
        filterBy: null

    }

    componentDidMount() {
        this.props.loadRecipes()
        this.props.loadProduces()
    }

    loadProduces = () => {
        this.props.loadProduces(this.state.filterBy)
    }

    onChange = ({ target }) => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.addVal = target.value;
        this.setState(newState)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadProduces())
    }




    render() {
        const { recipes } = this.props

        console.log('recipes', recipes);
        return (
            <div>
                <ProduceFilter onSetFilter={this.onSetFilter} />
                <RecipeList recipes={recipes} />

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        produces: state.produceReducer.produces
    }
}

const mapDispatchToProps = {
    loadRecipes,
    loadProduces
}



export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)