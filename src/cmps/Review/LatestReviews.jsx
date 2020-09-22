import React from 'react';
import { ReviewPreview } from './ReviewPreview';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function LatestReviews({ recipe, count }) {

    const latest = recipe.reviews.sort((review1, review2) => { return review1?.date > review2.date }).slice(0, count);
    return (
        <section>
            <div className="review-list latest-review-list" id="latest-review-list">
                {recipe && latest.map((review, ind) => {
                    return <ReviewPreview key={review._id + '_' + ind} review={review} />
                })}
            </div>
            {latest.length < recipe.reviews.length &&
                <Link to={`/recipe/${recipe._id}/review`}><Button variant="outlined">See all {recipe.reviews.length} reviews</Button></Link>
            }
        </section>
    )
}