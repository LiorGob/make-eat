import React, { Component } from 'react'
import SpoonIcon from '../icons/SpoonIcon';
import { RecipeDirectionStep } from './RecipeDirectionStep';
import Button from '@material-ui/core/Button';

export class RecipeDirection extends Component {

    state = {
        directions: []
    }

    componentDidMount() {
        var directions = []
        this.props.recipe.directions.map(() =>
            directions.push(false)
        )
        this.setState({ directions })
    }

    onDirectionCheck = (idx) => {
        var { directions } = this.state
        directions[idx] = !directions[idx]
        console.log('directions', directions)
        this.setState({ directions: [...this.state.directions] })
    }

    render() {
        const { recipe } = this.props
        return (
            <div className="recipe-directions recipe-section" >
                <div className="spoon-right"><SpoonIcon /></div>
                <h2 className="font-bold">Directions</h2>
                <ul>
                    {recipe.directions.map((direction, idx) =>
                        <RecipeDirectionStep key={idx} direction={direction} idx={idx} onDirectionCheck={this.onDirectionCheck} directionChecked={this.state.directions[idx]} />)}
                </ul>
                <Button variant="outlined" color="secondary" startIcon={<SpoonIcon />} className="recipe-details-btn" onClick={this.props.onAddToMadeIt}>
                    I Made It
                </Button>
            </div>

        )
    }
}
