import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ReviewPreview } from './ReviewPreview';
import {recipeService} from '../../services/recipeService.js'


export function LatestReviews({ recipe, count, reviewsNum, ratingAvg }) {
const sumReviews= recipeService.getReviewsNum(recipe._id)
    const latest = recipe.reviews.sort((review1, review2) => { return review1?.date > review2.date }).slice(0, count);
    return (
        <section className="review-in-details">
            <div className="review-list latest-review-list" id="latest-review-list">
                <h2>{`${ratingAvg} out of 5 stars from (${reviewsNum}) reviews `}</h2>
                {recipe && latest.map((review, ind) => {
                    return <ReviewPreview key={review._id + '_' + ind} review={review} />
                })}
            </div>
            {latest.length < recipe.reviews.length &&
                <Link to={`/recipe/${recipe._id}/review`}><Button className="btn btn-primary border-grey" color="secondary" variant="outlined">Show all {sumReviews} reviews</Button></Link>
            }
        </section>
    )
}