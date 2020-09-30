import React, { Component } from 'react'
import { Dialog } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import SecondaryButton from '../buttons/SecondaryButton';
// import FavoritesIcon from '../icons/FavoritesIcon';
import SpoonIcon from '../icons/SpoonIcon';
import { cloudinaryService } from '../../services/cloudinaryService.js';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import { recipeService } from '../../services/recipeService';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class AddReview extends Component {

    state = {
        // recipe: {
        //     imgs:[]
        // }
    }

    componentDidMount = async () => {
        const recipeId = this.props.recipeId;
        if (recipeId) {
            const recipe = await recipeService.getById(recipeId)
            this.setState({ recipe })
        }
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState({ [field]: value }, () => console.log(this.state))

    }

    onAddReview = (ev) => {
        console.log('on add review');
        ev.preventDefault()
        var newReview = { by: this.props.loggedInUser, txt: this.state.txt, rating: this.state.rating }
        console.log('newReview', newReview);
        this.props.onSubmitReview(newReview)
    }

    handleClose = () => {
        this.props.onClose();
    };

    onAddImg = async (ev) => {
        ev.preventDefault()
        const res = await cloudinaryService.uploadImg(ev)
        console.log(res, 'res');
        this.setState(prevState => {
            var newImgs = [...this.state.recipe.imgs]
            newImgs.push(res.secure_url)
            return {
                recipe: {
                    ...prevState.recipe,
                    imgs: newImgs
                }
            }
        })
    }
    render() {

        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">

                <form className="form-add-review flex column" onSubmit={this.onAddReview}>
                    <h2>Rate This Recipe</h2>
                    <Rating name="rating" type="number" onChange={this.onHandleChange} />
                    <TextField type="text" name="txt" variant="outlined" color="secondary" onChange={this.onHandleChange} />
                    <SecondaryButton type="submit" startIcon={<div className="spoon-top"><SpoonIcon /></div>} text='I made it' />

                </form>
            </Dialog>
        )
    }
}


