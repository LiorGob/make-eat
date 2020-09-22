import React from 'react'
import { RecipePreview } from '../recipe/RecipePreview';

export function UserReviews({user, recipes}) {
    return (
        <div>
            <h3>{user.fullName}'s Reviews</h3>            
            {recipes.map((recipe) => { return <RecipePreview key={recipe._id} user={user} recipe={recipe} showReviewBy={user} /> })}
        </div>
    )
}
