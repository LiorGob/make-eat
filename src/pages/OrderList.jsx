import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        const { location } = this.props
        let selectedIngredients = location && location.state ? location.state.selectedIngredients : []
        if (selectedIngredients.length > 0) sessionStorage.setItem("orderList", JSON.stringify(selectedIngredients))
        else
            selectedIngredients = JSON.parse(sessionStorage.getItem("orderList"))
        this.setState({ selectedIngredients }, console.log(location.state))
        console.log('mount');
    }

    // remove(){

    // }





    render() {

        if (!this.state.selectedIngredients.length) return <div>Loading...</div>
        return (
            <div className="main-container">
                <ul className="order-list">
                    {/* <button onClick={() => this.props.history.push('/')}>Back</button> */}
                    <h1 className="order-title flex">Shopping Cart</h1>
                    {this.state.selectedIngredients.map((ingredient, index) =>
                        <li className="produce-list clean list" key={`${ingredient.produceId}${index}`}>
                            <Checkbox type="checkbox" />
                            <label>{ingredient.name}</label>
                            <img className="produce-img" src={ingredient.img} alt="produce" />
                            <label>{`$${ingredient.price}`}</label>
                            <div className="shopping-cartbtn">
                                <button><DeleteIcon /></button>
                                <button><AddShoppingCartIcon /></button>
                            </div>
                        </li>)
                    }
                    <button className="checkout flex">Checkout</button>
                </ul>
            </div>
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



