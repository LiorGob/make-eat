import React from 'react'
import { IngredientSearch } from './IngredientSearch';
import { RecipeSearch } from './RecipeSearch';

export default function Search({onDoSearch}) {
    return (
        <div className="search-recipes">
            <RecipeSearch onDoSearch={onDoSearch}/>
            <IngredientSearch onDoSearch={onDoSearch} />
        </div>
    )
}

