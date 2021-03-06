import React from 'react'
import { RecipeList } from '../recipe/RecipeList';

export function MadeIt({ recipes }) {
    return (
        <React.Fragment>
            {recipes.length > 0 ?
                <RecipeList recipes={recipes} />
            :
            <h4>Your I Made It list is empty yet</h4>
            }
        </React.Fragment>
    )
}
