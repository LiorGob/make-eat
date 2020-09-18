import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RecipeList } from '../cmps/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions'
import { loadProduces } from '../store/actions/produceActions'
import { ProduceFilter } from '../cmps/produce/ProduceFilter'
import { RecipeFilter } from '../cmps/RecipeFilter'

class _RecipeApp extends Component {

    state = {
        filterBy: '',
        filterProduceList:[],
        filterRecipeList:[]

        

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

  




    render() {
        const { recipes } = this.props
        const{produces}=this.props

        return (
            <div>
                 <ProduceFilter filterField={"name"} getFilterProduceList={(filterProduceList)=>this.setState({filterProduceList})} produceList={produces}/>
                 <RecipeFilter filterField={"name"} getFilterRecipeList={(filterRecipeList)=>this.setState({filterRecipeList})} recipeList={recipes}  />
                <RecipeList recipes={recipes} />

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        produces: state.produceReducer.produces,
        filterBy: state.produceReducer.filterBy
    }
}

const mapDispatchToProps = {
    loadRecipes,
    loadProduces
}



export const RecipeApp = connect(mapStateToProps, mapDispatchToProps)(_RecipeApp)