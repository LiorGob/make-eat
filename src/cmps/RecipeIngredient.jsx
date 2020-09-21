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
    const [isAllChecked, setIsAllChecked] = useState(undefined)

    function handleSelectIngredient(selectedIngredient) {
        const ingredientsNotFound = -1
        let ingredientsList = selectedIngredients
        let existSelectedIngredientInd = ingredientsList.findIndex((ingredient) => ingredient.produceId === selectedIngredient.produceId)
        if (existSelectedIngredientInd === ingredientsNotFound) ingredientsList.push(selectedIngredient)
        else ingredientsList.splice(existSelectedIngredientInd, 1)
        setSelectedIngredients(ingredientsList)
        console.log(ingredientsList);
    }

    function handleSelectAllIngredients() {
        let ingredients = recipe.ingredients
        setIsAllChecked(isAllChecked ? undefined : true)
        if (!isAllChecked) {
            setSelectedIngredients(ingredients)
            console.log(ingredients)
        }
        else {
            setSelectedIngredients([])
        }

    }

    function setToOrderList() {
        if (!selectedIngredients.length) return
        history.push({ pathname: '/order', state: { selectedIngredients } })

    }

    return (
        <div className="ingredient-recipe">
            <span className="font-bold">Ingredients:</span>
            <button className="select-all" onClick={handleSelectAllIngredients} >Select all</button>
            <ul>
                {recipe.ingredients.map((ingredient,index) => <li className="clean-list" key={`${ingredient.produceId}${index}`}>
                    <label>
                        <input checked={isAllChecked} type="checkbox" onClick={() => handleSelectIngredient(ingredient)} />
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

