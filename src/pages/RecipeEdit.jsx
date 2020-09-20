import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { saveRecipe, removeRecipe } from '../store/actions/recipeActions';
import { cloudinaryService } from '../services/cloudinaryService'
import { recipeService } from '../services/recipeService'

class _RecipeEdit extends Component {

    state = {
        recipe: {
            name: '',
            abstract: '',
            // createdBy: '',
            imgs: [],
            // video,
            // ingredients: [],
            prepTime: +'',
            totalTime: +'',
            servings: +'',
            directions: []
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

    // setDirections = ( value ) => {
    //     const directions = value.split(',')
    //     const directionsMap = directions.map(direction => {
    //         return { direction }
    //     })
    //     this.setState(prevState => {
    //         var newDirections = [...this.state.recipe.directions]
    //         newDirections.push(directionsMap)
    //         return {
    //             recipe: {
    //                 ...prevState.recipe,
    //                 directions: newDirections
    //             }
    //         }
    //     })

    // }


    onSaveRecipe = async (ev) => {
        ev.preventDefault()
        await this.props.saveRecipe(this.state.recipe)
        this.props.history.push('/recipe')
    }

    onAddImg = async (ev) => {
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

    onRemove = async (recipeId) => {
        await this.props.removeRecipe(recipeId)
        this.props.history.push('/user')
    }
    render() {
        const { recipe } = this.state
        console.log('recipe edit', recipe.ingredients);
        return (
            <div className="edit-recipe">
                <form className="edit-form flex space-around" onSubmit={this.onSaveRecipe}>
                    <section className="edit-right-side flex column">
                        
                        <TextField variant="outlined" fullWidth type="text" name="name" label="Recipe title" onChange={this.onHandleChange} value={recipe.name} />

                        <TextField type="text" name="abstract" label="Description" multiline rows={4} variant="outlined" onChange={this.onHandleChange} value={recipe.abstract} />

                        <TextField variant="outlined" label="Ingredients" type="text" name="ingredients" placeholder={this.props.match.params.id ? recipe.ingredients : 'put each ingredient on its own line'} onChange={this.onHandleChange} value={recipe.ingredients} />

                        <TextField type="text" name="directions" multiline rows={4} variant="outlined" label="Directions" placeholder={this.props.match.params.id ? recipe.directions : 'put each step on its own line'} onChange={this.onHandleChange} value={recipe.directions} />
                    </section>

                    <section className="edit-left-side flex column">
                        <input type="file" name="imgs" onChange={this.onAddImg} />
                        <AddAPhotoIcon />

                        <TextField id="standard-number" variant="outlined" label="Prep Time" type="number" name="prepTime" onChange={this.onHandleChange} value={recipe.prepTime} />

                        <TextField type="number" name="totalTime" variant="outlined" label="Ready in" onChange={this.onHandleChange} value={recipe.totalTime} />

                        <TextField type="number" name="servings" variant="outlined" label="number of servings" onChange={this.onHandleChange} value={recipe.servings} />
                    </section>

                    <button className="flex align-start">{this.props.match.params.id ? <EditIcon className="main-color" fontSize="large"/> : <AddIcon className="main-color" fontSize="large"/>}</button>
                </form>
                <button onClick={() => this.onRemove(recipe._id)}><DeleteRoundedIcon className="main-color" fontSize="large"/></button>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        // recipe: state.recipeReducer.recipe
    }
}

const mapDispatchToProps = {
    saveRecipe,
    removeRecipe,
    // getRecipe
}

export const RecipeEdit = connect(mapStateToProps, mapDispatchToProps)(_RecipeEdit)