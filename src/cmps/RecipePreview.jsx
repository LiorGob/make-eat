import React from 'react';
import { Link } from 'react-router-dom';
import Stars from 'simple-rating-stars';


export function RecipePreview({ recipe }) {
    let ratingAvg = recipe.reviews.reduce((acc, a) => acc + a.rating, 0) / recipe.reviews.length
    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe._id}`}>
                <img src={recipe.imgs[0]} alt="" />
               </Link>
                <div className="recipe-preview-txt">
                    <h2>{recipe.name}</h2>
                    <h3><Stars stars={ratingAvg} outOf={5} full={'#ffff00'} empty={'#E1F1FF'} stroke={'#369'} />{recipe.reviews.length}</h3>
                    <h4>{recipe.createdBy.fullName}</h4>
                </div> 
        </div>
    )
}
