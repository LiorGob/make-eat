import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecipe } from '../store/actions/recipeActions.js';
import DeleteIcon from '@material-ui/icons/Delete';
// import Button from '@material-ui/core/Button';
import { addNotification, updateOrderList } from '../store/actions/orderActions.js';
// import SpoonIcon from '../cmps/icons/SpoonIcon';
import PrimaryButton from '../cmps/buttons/PrimaryButton'

// import { Badge } from '@material-ui/core';

export class _OrderList extends Component {
    state = {
        produceId: '',
        selectedIngredients: [],
        prices: []
    }


    componentDidMount() {
        window.scroll(0, 0);
        const { location } = this.props
        let selectedIngredients = location && location.state ? location.state.selectedIngredients : []
        if (selectedIngredients.length > 0) sessionStorage.setItem("orderListSize", JSON.stringify(selectedIngredients))
        else
            selectedIngredients = JSON.parse(sessionStorage.getItem("orderListSize"))
        this.setState({ selectedIngredients }, console.log(location.state))
        this.updateProduceInOrderList(selectedIngredients)
        console.log('mount');
    }


    onRemove = (ingredientName) => {
        console.log(ingredientName)
        let selectedIngredients = this.state.selectedIngredients
        let ingredientToRemoveIndex = selectedIngredients.findIndex((ingredient) => ingredient.name === ingredientName)

        selectedIngredients.splice(ingredientToRemoveIndex, 1)

        this.setState({ selectedIngredients })
        this.updateProduceInOrderList(selectedIngredients)

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
        return sumWithSheeping.toFixed(2)
    }

    updateProduceInOrderList(list) {
        this.props.updateOrderList(list.length)
    }

    render() {

        if (!this.state.selectedIngredients.length) return <div>Loading...</div>
        return (
            <div className="main-container">
                <div className="main-content">
                    <h1 className="order-title flex">Shopping Cart</h1>

                    <div className="shopping-details">
                        <p className="total-amount">Total Order :<span> ${this.getTotalAmount().toFixed(2)}</span></p>
                        <p className="shipping" style={{ borderBottom:"1px solid #00000026"}}>Shipping :<span> $5</span>
                        {/* <div className="spoon-decoration" style={{position:"absolute", bottom:"299px", right:"170px"}}><SpoonIcon/></div> */}
                        </p>
                        <p>Total With Shipping : ${this.getTotalAmountWithSheepping()}</p>
                        <PrimaryButton text="Pay Now" onClick={() => this.onCheckout()} variant="outlined"
                            color="secondary" className="align-end btn btn-primary bg-pan-left"
                             style={{ width: '250px', height:"60px", backgroundColor:"#ff385c", color:"white" }}/>
                           

                    </div>

                    <ul className="order-list">

                        {this.state.selectedIngredients.map((ingredient, index) =>
                            <li className="produce-list clean list" key={`${ingredient.produceId}${index}`}>
                                {/* <Checkbox type="checkbox" /> */}
                                <div className="ingredient-name">
                                <label>{ingredient.name}</label>
                                </div>
                                <img className="produce-img" src={ingredient.img} alt="produce" />
                                <div className="produce-price">{`$${ingredient.price}`}</div>
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
    console.log(state);
    return {

        recipe: state.recipeReducer.recipe

    }
}

const mapDispatchToProps = {
    getRecipe,
    addNotification,
    updateOrderList
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
