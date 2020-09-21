import React from 'react'
import { RecipeList } from '../RecipeList';

export function Favorites({ recipes }) {
    return (
        <div className="container">
            <h3>My Favorites</h3>
            <RecipeList recipes={recipes}/>
        </div>
    )
}
