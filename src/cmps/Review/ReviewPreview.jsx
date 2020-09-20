import React from 'react'
import RatingStar from '../RatingStar';
import { Link } from 'react-router-dom';

export function ReviewPreview({ review }) {
    return (
        <div className="recipe-review-wrapper border-botton-grey">
            <div className="recipe-review-byline">
                <Link className="recipe-review-author" to={`/user/${review.by._id}/about`}>
                    <span className="reviewer-image-wrapper">
                        <img className="" alt="profile-img" src={review.by.imgUrl} />
                    </span>
                    <span className="reviewer-name color-underline">
                        {review.by.fullName}
                    </span>
                </Link>
            </div>
            <div className="recipe-review-rating flex row">
                <RatingStar />{review.rating}
                <span className="recipe-review-date">12/03/2018</span>
            </div>
            <div className="recipe-review-body">
                {review.txt}
            </div>
        </div>
    )
}
