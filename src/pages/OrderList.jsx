import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RecipeIngredient } from '../cmps/RecipeIngredient'
import { getRecipe } from '../store/actions/recipeActions.js';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


export class _OrderList extends Component {
    state = {
        produceId: '',
        selectedIngredients: []

    }


    componentDidMount() {
        // const { location } = this.props
        const { selectedIngredients } = this.props.location
        // let selectedIngredients = location.state ? location.state.selectedIngredients : []
        // if (selectedIngredients.length > 0) sessionStorage.setItem("orderList", JSON.stringify(selectedIngredients))
        // else
        //     selectedIngredients = JSON.parse(sessionStorage.getItem("orderList"))
        // this.setState({ selectedIngredients }, console.log(location.state))
    }

    // remove(){

    // }




    render() {
        const { recipe, location } = this.props
        const { selectedIngredients } = location.state
        if (!recipe) return <div>Loading...</div>
        return (

            <ul className="order-list">
                <button onClick={()=> this.props.history.push('/')}>Back</button>  
                <h1 className="order-title">Shopping Cart</h1>

                {selectedIngredients.map(ingredient =>
                    <li className="produce-list clean list" key={ingredient.produceId}>
                        <Checkbox type="checkbox" />
                        <label>{ingredient.name}</label>
                        <img className="produce-img" src={ingredient.img} />
                        <label>{`${ingredient.price}`}$</label>
                        <div className="shopping-cartbtn">
                            <button><DeleteIcon /></button>
                            <button><AddShoppingCartIcon /></button>

                        </div>
                    </li>)

                }
                <button>Checkout</button>

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


