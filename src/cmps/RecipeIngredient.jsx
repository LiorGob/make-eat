import React from 'react'
import DoneAllIcon from '@material-ui/icons/DoneAll';

export  function RecipeIngredient({ recipe }) {
    return (
        <div className="ingredient-recipe">
            <span className="font-bold">Ingredients:</span>
            <ul>
                {recipe.ingredients.map(ingredient => <li key={ingredient.produceId} >
                    <label>
                        <input type="checkbox" />
                    </label>
                    {ingredient.amount} {ingredient.spec ? ingredient.spec : ''} {ingredient.name}</li>)}
                <button className="font-bold">Add All Ingredients To Shopping Cart
                    <DoneAllIcon style={{ color: '#ff385c' }} />
                    </button>
            </ul>
        </div>

    )
}

