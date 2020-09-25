import React, { useState } from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { withRouter } from 'react-router'
import { useHistory } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';

function _RecipeIngredient({ recipe }) {
    let history = useHistory()
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [numOfINgredients, setNumOfINgredients] = useState(0);
    const [isAllChecked, setIsAllChecked] = useState(undefined)
    

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
    
        if (numOfINgredients === 0) {
          
            handleSelectAllIngredients()
        }

    }

    function handleSelectAllIngredients() {
        let ingredients = recipe.ingredients
        setIsAllChecked(isAllChecked ?false : true)
        console.log(isAllChecked);
        if (!isAllChecked) {
            setSelectedIngredients(ingredients)
            console.log(ingredients)
        }
        else {
            setSelectedIngredients([])
           
            setNumOfINgredients(ingredients.length);
        }
    }


    function isIngredientChecked(name) {
        let ingredientsList = selectedIngredients
        let checkedIngredientIndex = ingredientsList.findIndex((ingredient) => ingredient.name === name)
        if (checkedIngredientIndex > -1) return true
        return false

    }


    function goToCheckout() {
        // console.log(selectedIngredients,'yes');
        // if (numOfINgredients === 0) {
        //     console.log(numOfINgredients);
        //     return
        // }
            
        history.push({ pathname: '/order', state: { selectedIngredients: selectedIngredients } })

    }




    return (
        <div className="recipe-ingredients recipe-section">
            <h2>Ingredients:</h2>
            {/* <button className="select-all" onClick={handleSelectAllIngredients} ><AddIcon color="secondary"></AddIcon></button> */}
           
            <ul>
                {recipe.ingredients.map((ingredient, idx) =>
                    <li className="clean-list" key={`${ingredient.produceId}_${idx}`}>
                        <label>
                            <FormControlLabel

                                control={<Checkbox checked={isAllChecked || isIngredientChecked(ingredient.name)} onChange={() => handleSelectIngredient(ingredient)} />}
                                label={`${ingredient.amount} ${ingredient.spec ? ingredient.spec : ''} ${ingredient.name}`}
                            />
                           
                        </label>
                    </li>)}
            </ul>
            <Button variant="outlined" color="secondary" onClick={setToOrderList} endIcon={<DoneAllIcon style={{ color: '#ff385c' }} />} className="recipe-details-btn">
                Add {numOfINgredients === 0 ? 'All' : numOfINgredients} Ingredients To Shopping Cart
            </Button>
            <Tooltip title="Go to shopping Cart">
                <ShoppingCartIcon className="checkout " color="secondary" style={{ width: "90px", height: "40px", cursor: "pointer", position: "absolute" }} onClick={goToCheckout} />
            </Tooltip>
        </div>

    )
}

export const RecipeIngredient = withRouter(_RecipeIngredient)

