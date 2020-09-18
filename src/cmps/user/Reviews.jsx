import React from 'react'
import { ReviewList } from '../Review/ReviewList';

export function Reviews({user, recipes}) {
    return (
        <div>
            <h3>{user.fullName}'s Reviews</h3>            
            <ReviewList user={user} recipes={recipes}/>
        </div>
    )
}
