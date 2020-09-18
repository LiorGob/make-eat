import React from 'react'
import { RecipeList } from '../RecipeList';

export function Favorites({ recipes, onAddToFavorites }) {
    function addToFavs(){
        onAddToFavorites('r5c09');
    }
    return (
        <div className="container">
            <h3>My Favorites</h3>
            <RecipeList recipes={recipes}/>
            <button onClick={addToFavs}>Add Pizza to Favorites</button>
        </div>
    )
}
