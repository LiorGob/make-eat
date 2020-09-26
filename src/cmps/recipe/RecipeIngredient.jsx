import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { useHistory } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function _RecipeIngredient({ recipe }) {
    let history = useHistory()
    const [ingredients, setIngredients] = useState(recipe.ingredients.map(ingredient => { return { ...ingredient, selected: false } }));
    const [addedToCart, setAddedToCart] = useState(false);

    function handleSelectIngredient(selectedIngredient) {
        let ingredientsToUpdate = [...ingredients];
        let ind = ingredientsToUpdate.findIndex((ingredient) => ingredient.produceId === selectedIngredient.produceId);
        if (ind >= 0) ingredientsToUpdate[ind].selected = !ingredientsToUpdate[ind].selected;
        setIngredients(ingredientsToUpdate);
        if (getSelectedIngredientsNum() === 0) setAddedToCart(false);
    }

    function addIngredients() {
        if (getSelectedIngredientsNum() === 0) {
            const updated = ingredients.map(ingr => { return { ...ingr, selected: true } });
            setIngredients(updated);
        }
        setAddedToCart(true);
    }

    function getSelectedIngredients() {
        return ingredients.filter(ingredient => ingredient.selected);
    }

    function getIngredientLabel(ingredient) {
        return `${ingredient.amount} ${ingredient.spec ? ingredient.spec : ''} ${ingredient.name}`;
    }

    function getSelectedIngredientsNum() {
        return getSelectedIngredients().length;
    }

    function getShoppingCartBadge() {
        return addedToCart ? getSelectedIngredientsNum() : 0;
    }

    function getButtonLabel() {
        const selectedNum = getSelectedIngredientsNum();
        return (selectedNum === 0) ? 'All' : selectedNum;
    }

    function goToCheckout() {
        const copyIngr = JSON.parse(JSON.stringify(getSelectedIngredients()));
        const selected = copyIngr.map(ingredient => { delete ingredient.selected; return ingredient });
        history.push({ pathname: '/order', state: { selectedIngredients: selected } })
    }

    return (
        <div className="recipe-ingredients recipe-section">
            <h2>Ingredients:</h2>
            <ul>
                {ingredients.map((ingredient, idx) =>
                    <li className="clean-list" key={`${ingredient.produceId}_${idx}`}>
                        <label>
                            <FormControlLabel
                                control={<Checkbox checked={ingredient.selected} onChange={() => handleSelectIngredient(ingredient)} />}
                                label={getIngredientLabel(ingredient)}
                            />
                        </label>
                    </li>)}
            </ul>
            <SwitchTransition mode='out-in'>
                <CSSTransition
                    key={!addedToCart}
                    classNames="fade"
                    timeout={500}
                >
                    <div className="button-container">
                        {!addedToCart ?
                            <Button variant="outlined" color="secondary" onClick={addIngredients} className="btn btn-primary">
                                Add {getButtonLabel()} Ingredients To Shopping Cart
                            </Button>
                            :
                            <IconButton aria-label="cart" onClick={goToCheckout}>
                                <StyledBadge badgeContent={getShoppingCartBadge()} color="secondary">
                                    <ShoppingCartIcon style={{ fontSize: 40 }} />
                                </StyledBadge>
                            </IconButton>
                        }
                        
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>

    )
}
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px'
    },
}))(Badge);
export const RecipeIngredient = withRouter(_RecipeIngredient)

