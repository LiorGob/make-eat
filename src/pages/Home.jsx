import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'

export class Home extends Component {

    render() {

        return (
            <div className="home-page">
                <video width="980" height="400" controls>
                    <source src="./assets/images/hero.mp4" type="video/mp4" />
                </video>
                <section>
                    <img src="./src/assets/images/sushi.jpg"></img>
                </section>

            </div>
        )
    }
}

