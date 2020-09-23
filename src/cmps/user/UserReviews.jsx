import React from 'react'
import { RecipePreview } from '../recipe/RecipePreview';

export function UserReviews({ user, recipes }) {
    return (
        <div className="container">
            {
                recipes.length ?
                    <div className="card-grid">
                        <h3>{user.fullName}'s Reviews</h3>
                        {recipes.map((recipe) => { return <RecipePreview key={recipe._id} user={user} recipe={recipe} showReviewBy={user} /> })}
                    </div>
                    :
                    <h4>You haven't reviwed any recipes yet</h4>
            }
        </div>
    )
}
