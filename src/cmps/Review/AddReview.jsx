import React, { Component } from 'react'
import { Dialog } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import SecondaryButton from '../buttons/SecondaryButton';
import FavoritesIcon from '../icons/FavoritesIcon';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import { recipeService } from '../../services/recipeService';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class AddReview extends Component {

    state = {

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

    render() {

        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">

                <form className="flex column" onSubmit={this.onAddReview}>
                    <Rating name="rating" type="number" onChange={this.onHandleChange} />
                    <TextField type="text" name="txt" variant="outlined" color="secondary" onChange={this.onHandleChange} />
                    {/* <input type="number" min="1" max="5" name="rating" onChange={this.onHandleChange} /> */}
                    {/* <Rating name="rating" defaultValue={2.5} precision={0.5} onChange={this.onHandleChange} /> */}
                    {/* <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Controlled</Typography>
                    <Rating  name="rating" onChange={this.onHandleChange}/>
                    </Box> */}
                    {/* <button type="submit">save</button> */}
                    <SecondaryButton type="submit" startIcon={<FavoritesIcon className="save-icon" />} text='save' />


                </form>
            </Dialog>
        )
    }
}


