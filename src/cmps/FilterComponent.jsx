import { TrafficRounded } from '@material-ui/icons'
import React, { Component } from 'react'

export class FilterComponent extends Component {

    state = {
        name: ''
    }
   
    filterWithoutIngredient(value){
        const { list, getFilterList,filterField} = this.props
        let filteredList = list.filter((item) => item[filterField].toLowerCase().includes(value.toLowerCase()))
        getFilterList && getFilterList(filteredList)
    }
    filterWithIngredient(value){
        const { list, getFilterList,filterField} = this.props
       let filteredList= list.filter((recipe)=>{
           let ingredients = recipe.ingredients
            for(let index in ingredients){
            if(ingredients[index][filterField].toLowerCase().includes(value.toLowerCase())){
            // console.log('Found!')
            return true}
            }
            return false;

        })
        // console.log(filteredList)
        getFilterList && getFilterList(filteredList)
    }
  
    onHandleChange = ({ target }) => {
        const { isIngredients} = this.props
        const field = target.name
        const value = target.value
        if(isIngredients)
        this.filterWithIngredient(value)
        else
        this.filterWithoutIngredient(value)

        this.setState(prevState => ({ ...prevState, [field]: value }))
    }

    render() {
        const { name } = this.state
        const {placeholder}=this.props
        return (
            <div className="produce-filter">
                <input type="text" className="name-filter" name="name" autoComplete="off" value={name} onChange={this.onHandleChange} placeholder={placeholder} />

            </div>
        )

    }

}

