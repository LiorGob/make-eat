import React from 'react'
import {RecipePreview} from './RecipePreview'

export function RecipeList({ recipes }) {

    return (
        <div className="recipe-list">
            {recipes.map((recipe) => { return <RecipePreview key={recipe._id} recipe={recipe} /> })}

        </div>
    )
}
