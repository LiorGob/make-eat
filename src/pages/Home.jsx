import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
import hero from '../assets/images/hero.mp4'
import sushi from '../assets/images/sushi.jpg'
import mouls from '../assets/images/french/mouls.jpg'
import pizza6 from '../assets/images/italian/pizza6.jpg'
import { RecipeList } from '../cmps/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions.js'

class _Home extends Component {

    componentDidMount() {
        this.props.loadRecipes()
    }

    changeRoute(route) {
        this.props.history.push(route)
    }
    render() {
        const { recipes } = this.props
        console.log(recipes);
        let images = [
            { image: sushi, route: '/recipe', description: 'Japaneese' },
            { image: mouls, route: '/recipe', description: 'French' },
            { image: pizza6, route: '/recipe', description: 'Italian' },

        ]
        return (

            <div className="home-page">
                <video width={window.innerWidth} style={{ objectFit: 'fill' }} height="600" autoPlay loop muted>
                    <source src={hero} type="video/mp4" />
                </video>
                <div className="tag-card">
                    {images.map((imageItem, ind) => {
                        return (<div className="description" key={`${ind}${imageItem.image}`}><img className="tag" onClick={() => this.changeRoute(imageItem.route)} src={imageItem.image} alt="" /><span>{imageItem.description}</span></div>)
                    })}
                  
                </div>
                <RecipeList recipes={recipes.slice(0, 4)} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes
    }
}
const mapDispatchToProps = {
    loadRecipes,


}
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)


