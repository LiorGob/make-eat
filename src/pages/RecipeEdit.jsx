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
// import { loadProduces } from '../store/actions/produceActions.js'

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
        // await this.props.loadProduces('')
        // console.log('ing: ', this.props);
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

    setDirections = (value) => {
        const newDirections = value.currentTarget.value.split('\n')
        this.setState(prevState => {
            return {
                recipe: {
                    ...prevState.recipe,
                    directions: newDirections
                }
            }
        })
    }

    
    onSetIngredients = (value) => {
        try 
        {
            const produces = value.currentTarget.value.trim().split('\n')
            for (let i = 0; i < produces.length; i++) {
                const produce =  produces[i]
                //const ammount = produce.split(' ')[0]
                const name = produce.split(' ')[1]
                const isProduceExist = this.props.produces.filter(p => p.name === name).length === 1
                if (!isProduceExist) {
                    console.warn(`the product ${name} is not exist`)
                }
            }
        }
        catch {
            console.error(`produces list is invalid.`)
        }
    }

    onSaveRecipe = async (ev) => {
        ev.preventDefault()
        // newIng = getNewIngredients(str)
        // this.state.recipe.ingredients = [ {name: 'eggs', ammount: 23}, {}, {} ]
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
        // console.log('recipe edit', recipe.ingredients);
        // let ingredientStr = ''
        // for (let i = 0; i < recipe.ingredients.length; i++) {
        //     const ingr = recipe.ingredients[i]
        //     ingredientStr += `${ingr.amount} ${ingr.name}\n`
        // }
        return (
            <div className="main-container">
            <div className="edit-recipe">
                <form className="edit-form flex space-around" onSubmit={this.onSaveRecipe}>
                    <section className="edit-right-side flex column">

                        <TextField variant="outlined" fullWidth type="text" name="name" label="Recipe title" onChange={this.onHandleChange} value={recipe.name} />

                        <TextField type="text" name="abstract" label="Description" multiline rows={4} variant="outlined" onChange={this.onHandleChange} value={recipe.abstract} />

                        {/* <TextField type="text" variant="outlined" label="Ingredients"  multiline rows={4}  name="ingredients" placeholder={this.props.match.params.id ? recipe.ingredients : 'put each ingredient on its own line'} onChange={this.onSetIngredients} defaultValue={ ingredientStr } /> */}

                        <TextField type="text" name="directions" multiline rows={4} variant="outlined" label="Directions" placeholder={this.props.match.params.id ? recipe.directions : 'put each step on its own line'} onChange={this.setDirections} defaultValue={recipe.directions} />
                    </section>

                    <section className="edit-left-side flex column">
                        <input type="file" name="imgs" onChange={this.onAddImg} />
                        <AddAPhotoIcon />

                        <TextField id="standard-number" variant="outlined" label="Prep Time" type="number" name="prepTime" onChange={this.onHandleChange} value={recipe.prepTime} />

                        <TextField type="number" name="totalTime" variant="outlined" label="Ready in" onChange={this.onHandleChange} value={recipe.totalTime} />

                        <TextField type="number" name="servings" variant="outlined" label="number of servings" onChange={this.onHandleChange} value={recipe.servings} />
                    </section>

                    <button className="flex align-start">{this.props.match.params.id ? <EditIcon className="main-color" fontSize="large" /> : <AddIcon className="main-color" fontSize="large" />}</button>
                </form>
                <button onClick={() => this.onRemove(recipe._id)}><DeleteRoundedIcon className="main-color" fontSize="large" /></button>
            </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,
        // produces: state.produceReducer.produces
        // recipe: state.recipeReducer.recipe
    }
}

const mapDispatchToProps = {
    saveRecipe,
    removeRecipe,
    // loadProduces
    // getRecipe
}

export const RecipeEdit = connect(mapStateToProps, mapDispatchToProps)(_RecipeEdit)


