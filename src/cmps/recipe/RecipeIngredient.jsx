import React, { useState } from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { withRouter } from 'react-router'
import { useHistory } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

function _RecipeIngredient({ recipe }) {
    let history = useHistory()
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [numOfINgredients, setNumOfINgredients] = useState(0);

    function handleSelectIngredient(selectedIngredient) {
        const ingredientsNotFound = -1
        let ingredientsList = selectedIngredients
        let existSelectedIngredientInd = ingredientsList.findIndex((ingredient) => ingredient.produceId === selectedIngredient.produceId)
        if (existSelectedIngredientInd === ingredientsNotFound) ingredientsList.push(selectedIngredient)
        else ingredientsList.splice(existSelectedIngredientInd, 1)
        setSelectedIngredients(ingredientsList);
        setNumOfINgredients(ingredientsList.length);
        console.log('num of ingredients', selectedIngredients.length);
    }

    function setToOrderList() {
        var _selectedIngredients = selectedIngredients;
        if (numOfINgredients === 0) {
            _selectedIngredients = recipe.ingredients;
        }
        history.push({ pathname: '/order', state: { selectedIngredients: _selectedIngredients } })
    }

    return (
        <div className="recipe-ingredients recipe-section">
            <h2>Ingredients:</h2>
            <ul>
                {recipe.ingredients.map((ingredient, idx) =>
                    <li className="clean-list" key={`${ingredient.produceId}_${idx}`}>
                        <label>
                            <FormControlLabel
                                control={<Checkbox onChange={() => handleSelectIngredient(ingredient)} />}
                                label={`${ingredient.amount} ${ingredient.spec ? ingredient.spec : ''} ${ingredient.name}`}
                            />
                            {/* <input type="checkbox" onClick={() => handleSelectIngredient(ingredient)} /> */}
                        </label>
                    </li>)}
            </ul>
            <Button variant="outlined" color="secondary" onClick={setToOrderList} endIcon={<DoneAllIcon style={{ color: '#ff385c' }} />} className="recipe-details-btn">
                Add {numOfINgredients === 0 ? 'All' : numOfINgredients} Ingredients To Shopping Cart
            </Button>
        </div>

    )
}

export const RecipeIngredient = withRouter(_RecipeIngredient)

