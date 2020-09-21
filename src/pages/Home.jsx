import React, { Component } from 'react'
import { connect } from 'react-redux';
import hero from '../assets/images/hero.mp4'
import sushi from '../assets/images/sushi.jpg'
import macaroons1 from '../assets/images/french/macaroons1.jpg'
import ravioli from '../assets/images/italian/ravioli.jpg'
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
            {image: macaroons1, route: '/recipe', tag: 'French'},
            { image: ravioli, route: '/recipe', tag: 'Italian' },

        ]
        return (

            <div className="home-page flex column">
                <video className="video-home" width={window.innerWidth} style={{ objectFit: 'cover' }}  autoPlay loop muted>
                    <source src={hero} type="video/mp4" />
                </video>
                <div className="main-container">
                <div className="cuisine-card">
                    {images.map((img, idx) => {
                        return (<div key={`${idx}${img.image}`}>
                            <img onClick={() => this.changeRoute(img.route, img.tag)} src={img.image} alt="" />
                            <span className="description flex">{img.tag}</span>
                        </div>)
                    })}

                </div>
                <RecipeList recipes={recipes.slice(0, 6)} />
            </div>
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


