import React from 'react'
import { RecipeList } from '../RecipeList';

export function Favorites(props) {
    return (
        <React.Fragment>
            <h3>My Favorites</h3>
            <div className="container">
                {props.about &&
                    <aside>
                        {props.about}
                    </aside>
                }
                <RecipeList recipes={props.recipes} />
            </div>
        </React.Fragment>
    )
}
