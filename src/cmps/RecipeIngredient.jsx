import React, { useState } from 'react'
// import { connect } from 'react-redux'
import DoneAllIcon from '@material-ui/icons/DoneAll';
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { useHistory } from 'react-router-dom'
// import { SelectAll } from '@material-ui/icons';

function _RecipeIngredient({ recipe }) {
    let history = useHistory()
    const [selectedIngredients, setSelectedIngredients] = useState([])

    function handleSelectIngredient(selectedIngredient) {
        const ingredientsNotFound = -1
        let ingredientsList = selectedIngredients
        let existSelectedIngredientInd = ingredientsList.findIndex((ingredient) => ingredient.produceId === selectedIngredient.produceId)
        if (existSelectedIngredientInd === ingredientsNotFound) ingredientsList.push(selectedIngredient)
        else ingredientsList.splice(existSelectedIngredientInd, 1)
        setSelectedIngredients(ingredientsList)
        console.log(ingredientsList);
    }

    function setToOrderList() {

        history.push({ pathname: '/order', state: { selectedIngredients } })

    }

    return (
        <div className="ingredient-recipe">
            <span className="font-bold">Ingredients:</span>
            <button className="select-all" >Select all</button>
            <ul>
                {recipe.ingredients.map(ingredient => <li className="clean-list" key={ingredient.produceId}>
                    <label>
                        <input type="checkbox" onClick={() => handleSelectIngredient(ingredient)} />
                    </label>
                    {ingredient.amount} {ingredient.spec ? ingredient.spec : ''} {ingredient.name}</li>)}
                <button className="font-bold" onClick={setToOrderList}>Add Ingredients To Shopping Cart
                    <DoneAllIcon style={{ color: '#ff385c' }} />
                </button>
            </ul>
        </div>

    )
}

export const RecipeIngredient = withRouter(_RecipeIngredient)

