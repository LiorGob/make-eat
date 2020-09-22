import React from 'react'
import { IngredientSearch } from './IngredientSearch';

export default function Search() {
    return (
        <div className="search-recipes">
            <IngredientSearch placeholder="Find a recipe" />
            <IngredientSearch isIngredients placeholder="Search by ingredient" />
        </div>
    )
}
