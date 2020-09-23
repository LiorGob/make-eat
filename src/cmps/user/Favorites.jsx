import React from 'react'
import { RecipeList } from '../recipe/RecipeList';

export function Favorites({recipes, about}) {
    return (
        <React.Fragment>
            <div className="container">
                {recipes.length ? <div>
                    <h3>My Favorites</h3>
                    {about &&  <aside>{about}</aside>}
                    <RecipeList recipes={recipes} /></div>
                :
                    <h4>Your Favorites list is empty yet</h4>
                }
            </div>
        </React.Fragment>
    )
}
