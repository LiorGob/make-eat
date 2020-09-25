import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveRecipe } from '../../store/actions/recipeActions';
import { recipeService } from '../../services/recipeService';

class _AddReview extends Component {

    state = {
        recipe: {
            reviews: [{ by:{}, txt: '', rating, }]
        }
    }

    componentDidMount = async () => {
        const recipeId = this.props.match.params.id
        if (recipeId) {
            const recipe = await recipeService.getById(recipeId)
            this.setState({ recipe })
        }
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            return {
                recipe: {
                    ...prevState.recipe,
                    [field]: value
                }
            }
        })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}





const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,

    }
}


const mapDispatchToProps = {
    saveRecipe,
}

export const AddReview = connect(mapStateToProps, mapDispatchToProps)(_AddReview)



