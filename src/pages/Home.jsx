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

    changeRoute(route, tag) {
        this.props.history.push(`${route}?tag=${tag}`);
    }
    render() {
        const { recipes } = this.props
        let images = [
            { image: sushi, route: '/recipe', tag: 'Japaneese' },
            { image: mouls, route: '/recipe', tag: 'French' },
            { image: pizza6, route: '/recipe', tag: 'Italian' },

        ]
        return (

            <div className="home-page">
                <video width={window.innerWidth} style={{ objectFit: 'fill' }} height="600" autoPlay loop muted>
                    <source src={hero} type="video/mp4" />
                </video>
                <div className="tag-card">
                    {images.map((img, ind) => {
                        return (<div className="description" key={`${ind}${img.image}`}>
                            <img className="tag" onClick={() => this.changeRoute(img.route, img.tag)} src={img.image} alt="" />
                            <span>{img.tag}</span>
                        </div>)
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


