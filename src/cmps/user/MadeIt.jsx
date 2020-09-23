import React from 'react'
import { RecipeList } from '../recipe/RecipeList';

export function MadeIt({ recipes }) {
    return (
        <React.Fragment>
            <div className="container">
                {recipes.length > 0 && <div>
                    <h3>I Made It:</h3>
                    <RecipeList recipes={recipes} />
                </div>}
                {recipes.length === 0 && <h4>Your I Made It list is empty yet</h4>}
            </div>
        </React.Fragment>
    )
}
