import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecipe } from '../store/actions/recipeActions.js';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import { addNotification } from '../store/actions/orderActions.js';
// import { Badge } from '@material-ui/core';

export class _OrderList extends Component {
    state = {
        produceId: '',
        selectedIngredients: [],
        prices: []
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


    onRemove = (ingredientName) => {
        console.log(ingredientName)
        let selectedIngredients = this.state.selectedIngredients
        let ingredientToRemoveIndex = selectedIngredients.findIndex((ingredient) => ingredient.name === ingredientName)

        selectedIngredients.splice(ingredientToRemoveIndex, 1)

        this.setState({ selectedIngredients })

    }

    onCheckout = () => {

        this.props.addNotification(this.props.recipe, this.props.loggedInUser);
        this.props.history.push('/recipe');

    }


    getTotalAmount() {
        const { selectedIngredients } = this.state
        let ingredientPriceList = selectedIngredients.map((ingredient) => ingredient.price)
        return ingredientPriceList.reduce((prev, cur) => prev + cur)

    }

    getTotalAmountWithSheepping() {
        let totalAmount = this.getTotalAmount()
        let sheeping = 5
        let sumWithSheeping = totalAmount + sheeping
        console.log(sumWithSheeping);
        return sumWithSheeping
    }

    render() {

        if (!this.state.selectedIngredients.length) return <div>Loading...</div>
        return (
            <div className="main-container">
                <div className="main-content">

                    <h1 className="order-title flex">Shopping Cart</h1>
                    <div className="shopping-details">
                        <h3 className="total-amount">Total Order : ${this.getTotalAmount()}</h3>
                        <h3>sheeping : 5$</h3>
                        <h3>Total with Sheeping : ${this.getTotalAmountWithSheepping()}</h3>
                        <Button onClick={() => this.onCheckout()} variant="outlined" color="secondary" className="recipe-details-btn align-end btn btn-primary
" style={{ width: '100px' }} >
                            Pay Now!
                </Button>

                    </div>

                    <ul className="order-list">

                        {this.state.selectedIngredients.map((ingredient, index) =>
                            <li className="produce-list clean list" key={`${ingredient.produceId}${index}`}>
                                {/* <Checkbox type="checkbox" /> */}
                                <label>{ingredient.name}</label>
                                <img className="produce-img" src={ingredient.img} alt="produce" />
                                <label>{`$${ingredient.price}`}</label>
                                <div className="shopping-cartbtn">
                                    <button onClick={() => this.onRemove(ingredient.name)}><DeleteIcon /></button>

                                </div>

                            </li>)
                        }

                    </ul>

                </div>
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
    getRecipe,
    addNotification
}

export const OrderList = connect(mapStateToProps, mapDispatchToProps)(_OrderList)


/* <Tooltip title="Go to shopping Cart">
<Badge badgeContent={numOfINgredients} anchorOrigin={{
vertical: 'top',
horizontal: 'right',
}} color="secondary">
    <ShoppingCartIcon className="checkout " color="secondary" style={{ width: "50px", height: "40px", cursor: "pointer" }} onClick={goToCheckout} />
    </Badge>
</Tooltip> */
