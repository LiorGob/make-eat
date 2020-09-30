import React from 'react'
import { RecipeList } from '../recipe/RecipeList';
//import { About } from '../../cmps/user/About';

export function Favorites({ recipes, user }) {
    return (
        <React.Fragment>            
                {recipes.length > 0 ? 
                    <RecipeList recipes={recipes} />
                :
                <h4>Your Favorites list is empty yet</h4>
                }
            
        </React.Fragment>
    )
}
