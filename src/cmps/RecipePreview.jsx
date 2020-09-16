import React from 'react';
import Stars from 'simple-rating-stars';

export function RecipePreview({ recipe }) {
    let ratingAvg = recipe.reviews.reduce((acc, a) => acc + a.rating, 0) / recipe.reviews.length
    return (
        <div className="recipe-card">
            <img src={recipe.imgs[0]} alt="" />
            <h2>{recipe.name}</h2>
            <h3><Stars stars={ratingAvg} outOf={5} full={'#ffff00'} empty={'#E1F1FF'} stroke={'#369'} /></h3>
            <h3> {'*'.repeat(ratingAvg)} {ratingAvg}</h3>
            <h4>{recipe.createdBy.fullName}</h4>

        </div>
    )
}
