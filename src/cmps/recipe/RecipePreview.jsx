import React from 'react';
import { Link } from 'react-router-dom';
import RatingStar from '../icons/RatingStar';
import Truncate from 'react-truncate';
import { recipeService } from '../../services/recipeService';

export function RecipePreview({ recipe, showReviewBy }) {

    let ratingAvg = recipeService.getRatingAvg(recipe);
    const reviewsNum = recipeService.getReviewsNum(recipe._id)
    const reviewByUser = showReviewBy ? recipe.reviews.filter(review => review.by._id === showReviewBy._id)[0] : null;

    return (

        <div className="recipe-card">
            <div>
                <Link to={`/recipe/${recipe._id}`}>
                    <img src={recipe.imgs[0]} alt="" />
                </Link>
            </div>
            <div className="recipe-card-body">                
                <h3><Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link></h3>
                {(showReviewBy && (
                    <div>
                        <div>
                            <i>{`${showReviewBy.fullName}'s rating:`}</i><br />
                            <span><RatingStar />{reviewByUser.rating}</span>
                        </div>
                        <div className="rated-review-text">
                            {reviewByUser.txt}
                        </div>
                    </div>))}
                {(!showReviewBy && (
                    <React.Fragment>
                        <div className="recipe-stats">
                            <span className="rating">
                                <span><RatingStar /></span>
                                <span>{`${ratingAvg}(${reviewsNum})`}</span>
                            </span>
                            <span>{recipeService.getMadeByLabel(recipe._id)}</span>
                        </div>
                        <div className="abstract">
                            <Truncate lines={1} ellipsis={<span>...</span>}>
                                {recipe.abstract}
                            </Truncate>
                        </div>
                        <div>By <Link to={`/user/${recipe.createdBy._id}/about`} className="link-black">{recipe.createdBy?.fullName}</Link></div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
