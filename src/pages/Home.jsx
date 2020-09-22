import React, { Component } from 'react'
import { connect } from 'react-redux';
import hero from '../assets/images/hero.mp4'
import heroposter from '../assets/images/hero-poster.jpg'
//https://www.pexels.com/video/4252289/
// https://www.pexels.com/video/sprinkling-grated-cheese-a-toppings-for-a-serving-of-pasta-4058076/
import sushi from '../assets/images/sushi.jpg'
import macaroons1 from '../assets/images/french/macaroons1.jpg'
import ravioli from '../assets/images/italian/ravioli.jpg'
import { RecipeList } from '../cmps/recipe/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions.js'
import Search from '../cmps/search/Search';

class _Home extends Component {

    componentDidMount() {
        this.props.loadRecipes();
        this.props.setRootClass('inHomePage');
    }

    componentWillUnmount(){
        this.props.setRootClass('');
    }

    changeRoute(route, tag) {
        this.props.history.push(`${route}?tag=${tag}`);
    }
    render() {
        const { recipes } = this.props
        let images = [
            { image: sushi, route: '/recipe', tag: 'Japanese' },
            { image: macaroons1, route: '/recipe', tag: 'French' },
            { image: ravioli, route: '/recipe', tag: 'Italian' },

        ]
        return (

            <div className="home-page flex column">
<<<<<<< HEAD
                <video className="video-home" width={window.innerWidth} style={{ objectFit: 'cover' }} autoPlay loop muted>
                    
                    <source src={hero} type="video/mp4" />
                </video>
=======
                <div className="hero">
                    {/* poster={heroposter} */}
                    <video className="video-home" autoPlay  muted preload="auto">
                        <source src={hero} type="video/mp4" />
                        Your browser doesn't support the video tag
                    </video>
                    <div className="caption">
                        <h1>Welcome to makeEat</h1>
                        <h2>Make the dish of your dream come true</h2>
                        <Search/>
                    </div>
                </div>
>>>>>>> 2f11b58d6fc1fde45da2d90bec13213dcc2ae7cd
                <div className="main-container cuisine-container">
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
    loadRecipes
}
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)


