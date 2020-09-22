import React from 'react'
import RatingStar from '../RatingStar';
import { Link } from 'react-router-dom';

export function ReviewPreview({ review }) {
    return (
        <div className="recipe-review-wrapper">
            <div className="recipe-review-byline">
                <div className="reviewer-image-wrapper">
                    <Link to={`/user/${review.by._id}/about`}>
                        <img className="" alt="profile-img" src={review.by.imgUrl} />
                    </Link>
                </div>
                <div className="recipe-review-adr">
                    <div className="recipe-review-author">
                        <div className="reviewer-name">
                            {review.by.fullName}
                        </div>
                        <div className="recipe-review-date">12/03/2018</div>
                    </div>
                    <div className="recipe-review-rating flex row">
                        <RatingStar />{review.rating}
                    </div>
                </div>
            </div>
            <div className="recipe-review-body">
                {review.txt}
            </div>
        </div>
    )
}
