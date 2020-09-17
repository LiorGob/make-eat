import React from 'react'
import { RecipeList } from '../RecipeList';

export function MadeIt({ recipes }) {
    return (
        <div>
            <div className="container">
                <h3>I Made It:</h3>
                <RecipeList recipes={recipes} />
            </div>
        </div>
    )
}
