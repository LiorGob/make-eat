import React from 'react'

export function RecipePreview({ recipe }) {
    return (
        <div className="recipe-card">
            <h2>{recipe.name}</h2>
        </div>
    )
}
