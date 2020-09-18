import React from 'react';
import { Link } from 'react-router-dom';
import RatingStar from './RatingStar';
import { recipeService } from '../services/recipeService';
import SpoonIcon from './SpoonIcon';

export function RecipePreview({ recipe, showReviewBy }) {

    let ratingAvg = recipeService.getRatingAvg(recipe.reviews);
    const reviewByUser = showReviewBy ? recipe.reviews.filter(review => review.by._id === showReviewBy._id)[0] : null;
    
    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe._id}`}>
                <img src={recipe.imgs[0]} alt="" />
            </Link>
            <div className="recipe-preview-txt">
                <h3>{recipe.name}</h3>
                <SpoonIcon />
                {(showReviewBy && (<div>
                    <div>
                        <i>{`${showReviewBy.fullName}'s rating:`}</i><br />
                        <RatingStar />{reviewByUser.rating}
                    </div>
                    <div className="rated-review-text">
                        {reviewByUser.txt}
                    </div>
                </div>))}
                {(!showReviewBy && (
                    <div className="flex">
                        <RatingStar/>{ratingAvg}({recipe.reviews.length})
                        <p>{recipe.createdBy.fullName}</p>
                    </div>))}
            </div>
        </div>
    )
}
