import React from 'react'
import { RecipeList } from '../RecipeList';

export function UserRecipes({ recipes, user }) {

    function getLikersCount(recipes) {
        return countUsers('likers');
    }

    function getMakersCount(recipes) {
        return countUsers('makers');
    }

    function countUsers(list) {
        return recipes.reduce((acc, recipe) => {
            console.log(list, ' ', recipe[list]);
            const userCount = recipe[list] ? recipe[list].length : 0; 
            return acc + userCount;
        }, 0);
    }
    return (
        <React.Fragment>
            <h3>Personal Recipes</h3>
            <div className="container">
                <aside>
                <ul className="clear-list">
                    <li>Total makers: {getMakersCount()}</li>
                    <li>Total likers: {getLikersCount()}</li>
                </ul>
                </aside>
                <RecipeList recipes={recipes} />
            </div>
        </React.Fragment>
    )
}
