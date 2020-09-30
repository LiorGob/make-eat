import React from 'react'
import { Link } from 'react-router-dom';

export default function UserImage({user}) {
    return (
        <div className="user-image-wrapper">
            {user.imgUrl &&
            <Link to={`/user/${user._id}/favorites`}>
                <img className="" alt="profile-img" src={user.imgUrl} />
            </Link>
            }
        </div>
    )
}
