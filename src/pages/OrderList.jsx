import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RecipeIngredient } from '../cmps/RecipeIngredient'
import { getRecipe } from '../store/actions/recipeActions.js';


export class _OrderList extends Component {
    state = {
        produceId: '',
        selectedIngredients: []

    }


    componentDidMount() {
        // const { location } = this.props
        const {selectedIngredients} = this.props.location
        // let selectedIngredients = location.state ? location.state.selectedIngredients : []
        // if (selectedIngredients.length > 0) sessionStorage.setItem("orderList", JSON.stringify(selectedIngredients))
        // else
        //     selectedIngredients = JSON.parse(sessionStorage.getItem("orderList"))
        // this.setState({ selectedIngredients }, console.log(location.state))
    }

    // remove(){

    // }




    render() {
const {recipe,location} =this.props
const {selectedIngredients} =location.state
        return (

            <ul className="order-list">
                <h1 className="order-title">Order List</h1>
                { this.state.selectedIngredients.map(ingredient =>

                    <li className="produce-list" key={ingredient.produceId}>
                        {ingredient.name}
                        <img className="produce-img" src={ingredient.img} />
                        {ingredient.price}

                        <button>x</button>
                        <button>+</button>
                    </li>)

                }
            </ul>
        )


    }

}

const mapStateToProps = state => {
    return {
        recipe: state.recipeReducer.recipe
    }
}

const mapDispatchToProps = {
    getRecipe
}

export const OrderList = connect(mapStateToProps, mapDispatchToProps)(_OrderList)


