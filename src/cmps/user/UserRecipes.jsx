import React from 'react'
import { RecipeList } from '../recipe/RecipeList';

export function UserRecipes({ recipes }) {

    return (
        <React.Fragment>
            {recipes.length > 0 ?
                <RecipeList recipes={recipes} />
            :
            <h4>You didn't submit any recipes yet</h4>
            }
        </React.Fragment>
    )
}
