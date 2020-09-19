import React, { Component } from 'react'
import SpoonIcon from './SpoonIcon';
import { RecipeDirectionStep } from './RecipeDirectionStep';


export class RecipeDirection extends Component {

    state = {
        directions: []

    }

    componentDidMount() {
        var directions = []
        this.props.recipe.directions.map(() => {
            directions.push(false)
        })
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
            <div className="direction-recipe" >
                <SpoonIcon />
                <span className="font-bold">Directions</span>
                <ul>
                    {recipe.directions.map((direction, idx) =>
                        <RecipeDirectionStep key={idx} direction={direction} idx={idx} onDirectionCheck={this.onDirectionCheck} directionChecked={this.state.directions[idx]} />)}
                </ul>
                <button><SpoonIcon /> <span className="font-bold"> I Made It</span></button>
            </div>

        )
    }
}
