import React from 'react'
import { RecipeList } from '../RecipeList';

export function MadeIt({ recipes }) {
    return (
        <React.Fragment>
            <h3>I Made It:</h3>
            <div className="container">
                <RecipeList recipes={recipes} />
            </div>
        </React.Fragment>
    )
}
