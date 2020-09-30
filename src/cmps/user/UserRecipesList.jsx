import React from 'react'
import { RecipeList } from '../recipe/RecipeList';

export function UserRecipesList({ recipes, emptyText }) {

    return (
        <React.Fragment>
            {recipes.length > 0 ?
                <RecipeList recipes={recipes} />
            :
                <h4>{emptyText}</h4>
            }
        </React.Fragment>
    )
}
