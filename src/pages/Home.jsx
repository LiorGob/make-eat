import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import hero from '../assets/images/hero/hero.mp4';
import sushi from '../assets/images/sushi.jpg'
// import macaroons1 from '../assets/images/french/macaroons1.jpg'
// import ravioli from '../assets/images/italian/ravioli.jpg'
import { RecipeList } from '../cmps/recipe/RecipeList'
import { loadRecipes } from '../store/actions/recipeActions.js'
import { populateDBService } from '../services/populateDB.js';
import PrimaryButton from '../cmps/buttons/PrimaryButton';
import { Button } from '@material-ui/core';

class _Home extends Component {

    componentDidMount() {
        this.props.loadRecipes();
        this.props.setRootClass('inHomePage');
        this.populatedbStep2 = React.createRef();
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
            { image: 'https://res.cloudinary.com/duzhu2ejx/image/upload/v1600716009/sprint%204/mexican/tacos_ejumt3.webp', route: '/recipe', tag: 'mexican' },
            { image: 'https://res.cloudinary.com/duzhu2ejx/image/upload/v1601335563/sprint%204/french/macaroons_n22y6s.jpg', route: '/recipe', tag: 'french' },
            { image: 'https://res.cloudinary.com/duzhu2ejx/image/upload/v1600527675/sprint%204/italian/pizza1_mqqq0a.jpg', route: '/recipe', tag: 'italian' },
            { image: 'https://res.cloudinary.com/dbfuiddgm/image/upload/v1601131162/makeeat/humburger2_tdphnt_cropped_rruupt.jpg', route: '/recipe', tag: 'american' },
            // TBD: add more tags
        ];
        return (
            <div className="home-page flex column">
                <div className="hero">
                    {/* poster={heroposter} */}
                    <div className="video-container">
                        {/* <img src="https://res.cloudinary.com/duzhu2ejx/image/upload/v1601363981/sprint%204/hero_Moment1jpg_hkxodf.jpg"></img> */}
                        {/* <img src="https://res.cloudinary.com/duzhu2ejx/image/upload/v1601363986/sprint%204/hero_Moment4_qk2czp.jpg"></img> */}
                        <img src="https://res.cloudinary.com/duzhu2ejx/image/upload/v1601363984/sprint%204/hero_Moment3_r6khe1.jpg"></img>


                        {/* <video className="video-home" autoPlay muted preload="auto" loop>
                            <source src={hero} type="video/mp4" />
                        Your browser doesn't support the video tag
                    </video> */}
                    </div>
                    <div className="caption-container">
                        <div className="caption">
                            <div className="hp-titles">
                                <h1>Recipes from around the world</h1>
                                <h2>Community tested</h2>
                                <PrimaryButton text="Get cooking" onClick={() => console.log('Explore')} classes="hp-primary" />
                            </div>
                            {/* <Search /> */}
                        </div>
                    </div>
                </div>
                <div className="main-container cuisine-container">
                    <h2>Our most cooked cuisines</h2>
                    <div className="cuisine-card">
                        {images.map((img, idx) => {
                            return (<div key={`${idx}${img.image}`}>
                                <img onClick={() => this.changeRoute(img.route, img.tag)} src={img.image} alt="" />
                                <h5 className="description flex">{img.tag}</h5>
                            </div>)
                        })}

                    </div>
                    <div className="more-recipes"><h2>Top rated</h2> <Link to="/recipe">See all</Link></div>
                    <RecipeList recipes={recipes.slice(0, 4)} />
                    <div className="more-recipes"><h2>Latest</h2><Link to="/recipe">See all</Link></div>
                    <RecipeList recipes={recipes.slice(3, 7)} />
                    {!recipes.length &&
                        <section className="populatedb">
                            <Button variant="outlined" color="secondary" className="step step1" onClick={this.populateUsers}>
                                Populate users collection</Button>
                            <Button variant="outlined" color="secondary" className="step step2" onClick={this.populateProduce}>
                                Populate produce collection</Button>
                            <Button variant="outlined" color="secondary" className="step step3" onClick={this.populateRecipe}>
                                Populate recipe collection</Button>
                        </section>
                    }
                </div>
            </div>
        )
    }
    populateUsers() {
        populateDBService.populateUsers();
    }

    populateProduce() {
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


