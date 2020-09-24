import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import hero from '../assets/images/hero.mp4';
// https://res.cloudinary.com/dbfuiddgm/video/upload/v1600855132/makeeat/WhatsApp_Video_2020-09-23_at_12.56.49_v8du5a.mp4
//import heroposter from '../assets/images/hero-poster.jpg'
import sushi from '../assets/images/sushi.jpg'
import macaroons1 from '../assets/images/french/macaroons1.jpg'
import ravioli from '../assets/images/italian/ravioli.jpg'
import { RecipeList } from '../cmps/recipe/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions.js'
import Search from '../cmps/search/Search';
import {populateDBService} from '../services/populateDB.js';

class _Home extends Component {

    componentDidMount() {
        this.props.loadRecipes();
        this.props.setRootClass('inHomePage');
    }

    componentWillUnmount() {
        this.props.setRootClass('');
    }

    changeRoute(route, tag) {
        this.props.history.push(`${route}?tag=${tag}`);
    }

    render() {
        const { recipes } = this.props;
        let images = [
            { image: sushi, route: '/recipe', tag: 'japanese' },
            { image: 'https://res.cloudinary.com/duzhu2ejx/image/upload/v1600716009/sprint%204/mexican/tacos_ejumt3.webp',
            route: '/recipe', tag:'mexican'},
            { image: macaroons1, route: '/recipe', tag: 'french' },
            { image: ravioli, route: '/recipe', tag: 'italian' },
            // TBD: add more tags
        ];
        return (
            <div className="home-page flex column">
                <div className="hero">
                    {/* poster={heroposter} */}
                    <video className="video-home" autoPlay muted preload="auto">
                        <source src={hero} type="video/mp4" />
                        Your browser doesn't support the video tag
                    </video>
                    <div className="caption card-grid">
                        <div className="hp-titles">
                            <h1>Make Eat Share</h1>
                        </div>
                        <Search />
                    </div>
                </div>
                <div className="main-container cuisine-container">
                    <div className="cuisine-card">
                        <h2>world Cuisin</h2>
                        {images.map((img, idx) => {
                            return (<div key={`${idx}${img.image}`}>
                                <img onClick={() => this.changeRoute(img.route, img.tag)} src={img.image} alt="" />
                                <span className="description flex">{img.tag}</span>
                            </div>)
                        })}

                    </div>
                    <div className="more-recipes"><h2>Top rated</h2> <Link to="/recipe">See all</Link></div>
                    <RecipeList recipes={recipes.slice(0, 4)} />
                    <div className="more-recipes"><h2>Latest</h2><Link to="/recipe">See all</Link></div>
                    <RecipeList recipes={recipes.slice(3, 7)} />
                    {!recipes.length &&
                        <section>
                            <button onClick={this.populateUsers}>Populate users collection</button>
                            <button onClick={this.populateProduce}>Populate produce collection</button>
                            <button onClick={this.populateRecipe}>Populate recipe collection</button>
                        </section>
                    }
                </div>
            </div>
        )
    }
    populateUsers = () => {
        populateDBService.populateUsers();
    }

    populateProduce = () => {
        populateDBService.populateProduce();
    }

    populateRecipe = () => {
        populateDBService.populateRecipe();
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


