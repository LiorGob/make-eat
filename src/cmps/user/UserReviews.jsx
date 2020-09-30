import React from 'react'
import { RecipePreview } from '../recipe/RecipePreview';

export function UserReviews({ user, recipes }) {
    return (        
        <React.Fragment>
            {recipes.length > 0 ?
            <div className="recipe-list card-grid">
                {recipes.map(recipe => <RecipePreview key={recipe._id} user={user} recipe={recipe} showReviewBy={user} /> )}
            </div>
            :
            <h4>You haven't reviewed any recipes yet</h4>
            }
        </React.Fragment>
    )
}
