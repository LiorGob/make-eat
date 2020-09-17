import React from 'react';
import { Link } from 'react-router-dom';
// import Stars from 'simple-rating-stars';
import GradeIcon from '@material-ui/icons/Grade';


export function RecipePreview({ recipe }) {
    let ratingAvg = recipe.reviews.reduce((acc, a) => acc + a.rating, 0) / recipe.reviews.length
    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe._id}`}>
                <img src={recipe.imgs[0]} alt="" />
               </Link>
                <div className="recipe-preview-txt">
                    <h3>{recipe.name}</h3>
    {/* <div><Stars stars={1} outOf={2} full={'#ffff00'} empty={'#E1F1FF'} stroke={'#369'} />{ratingAvg}({recipe.reviews.length})</div> */}
    <div><GradeIcon style={{ color: '#ff385c' }}/>{ratingAvg}({recipe.reviews.length})</div>
                    <p>{recipe.createdBy.fullName}</p>
                </div> 
        </div>
    )
}
