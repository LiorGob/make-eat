import React from 'react';
//import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function FavoritesIcon({fontSize, style, className}) {
    return (
        <span><FavoriteIcon fontSize={fontSize} style={style} className={className} /></span>
    )
}
