import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecipe } from '../store/actions/recipeActions.js';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import {addNotification} from '../store/actions/orderActions.js';

export class _OrderList extends Component {
    state = {
        produceId: '',
        selectedIngredients:[],
        // totalAmount
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
       let selectedIngredients= this.state.selectedIngredients
       let ingredientToRemoveIndex = selectedIngredients.findIndex((ingredient) => ingredient.name ===  ingredientName)
     
       selectedIngredients.splice(ingredientToRemoveIndex, 1)

       this.setState({selectedIngredients})
       
    }

    onCheckout = () => {
       
        this.props.addNotification(this.props.recipe, this.props.loggedInUser);
            this.props.history.push('/recipe'); 
        
    }

    // onTotalAmount=(price)=>{
    //     console.log(price);

    // }

    render() {

        if (!this.state.selectedIngredients.length) return <div>Loading...</div>
        return (
            <div className="main-container">
               
                <h1 className="order-title flex">Shopping Cart</h1>
                {/* <h2 className="total-amount" {this.state.totalAmount}></h2> */}
                <ul className="order-list">
                    
                    {this.state.selectedIngredients.map((ingredient, index) =>
                        <li className="produce-list clean list" key={`${ingredient.produceId}${index}`}>
                            <Checkbox type="checkbox" />
                            <label>{ingredient.name}</label>
                            <img className="produce-img" src={ingredient.img} alt="produce" />
                            <label>{`$${ingredient.price}`}</label>
                            <div className="shopping-cartbtn">
                                <button onClick={()=>this.onRemove(ingredient.name)}><DeleteIcon /></button>
                                {/* <button><AddShoppingCartIcon /></button> */}
                            </div>
                        </li>)
                    }

                </ul>
                <Button  onClick={()=>this.onCheckout()} variant="outlined" color="secondary" className="recipe-details-btn" style={{ width: '100px' }} >
                    Checkout
                  
                </Button>
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



