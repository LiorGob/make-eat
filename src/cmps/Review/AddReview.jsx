import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
// import Rating from '@material-ui/lab/Rating';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import { recipeService } from '../../services/recipeService';

export class AddReview extends Component {

    state = {

    }

    componentDidMount = async () => {
        const recipeId = this.props
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
        ev.preventDefault()
        var newReview = { by: this.props.loggedInUser, txt: this.state.txt, rating: this.state.rating }
        console.log('newReview', newReview);
        this.props.onAddReview(newReview)
    }

    render() {

        return (
            <div>
                <form onSubmit={this.onAddReview}>
                    <TextField type="text" name="txt" variant="outlined" color="secondary" onChange={this.onHandleChange} />
                    <input type="number" min="1" max="5" name="rating" onChange={this.onHandleChange} />
                    {/* <Rating name="rating" defaultValue={2.5} precision={0.5} onChange={this.onHandleChange} /> */}
                    {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
                    {/* <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Controlled</Typography>
                    <Rating  name="rating" onChange={this.onHandleChange}/>
                    </Box> */}
                    <button type="submit">save</button>
                </form>

            </div>
        )
    }
}


