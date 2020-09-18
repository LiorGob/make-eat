import React from 'react'

export function RecipeDirection({ recipe }) {
    return (
        <div className="directions-recipe">Directions
            <ul>
                {recipe.directions.map((direction, idx) => <li key={direction.id} direction={direction} >
                    <label>
                        <input type="checkbox" />
                        <span>Step {idx + 1}</span>
                    </label>
                    <div><p>{direction}</p></div></li>)}
            </ul>
        </div>

    )
}
