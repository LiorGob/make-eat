import React from 'react'
import { IngredientSearch } from './IngredientSearch';
import { RecipeSearch } from './RecipeSearch';

export default function Search() {
    return (
        <div className="search-recipes">
            <RecipeSearch placeholder="Find a recipe" />
            <IngredientSearch placeholder="Search by ingredient" />
        </div>
    )
}
