
// import React, { Component } from 'react'

// export class RecipeFilter extends Component {

//     state = {
//         name: ''
//     }


//     onHandleChange = ({ target }) => {
//         const { recipeList, getFilterRecipeList,filterField} = this.props
//         const field = target.name
//         const value = target.value
//         let filteredList = recipeList.filter((recipe) => recipe[filterField].toLowerCase().includes(value.toLowerCase()))
//         getFilterRecipeList && getFilterRecipeList(filteredList)

//         this.setState(prevState => ({ ...prevState, [field]: value }))
//     }

//     render() {
//         const { name } = this.state
//         return (
//             <div className="recipe-filter">
//                 <input type="text" className="name-filter" name="name" autoComplete="off" value={name} onChange={this.onHandleChange} placeholder="Search Recipe" />

//             </div>
//         )

//     }

// }