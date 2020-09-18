import React, { Component } from 'react'
import { RecipePreview } from '../RecipePreview';

export function ReviewList({ user, recipes }) {

    return (
        <div className="recipe-list card-grid">
            {recipes.map((recipe) => { return <RecipePreview key={recipe._id} user={user} recipe={recipe} showReviewBy={user} /> })}
        </div>
    )
}
