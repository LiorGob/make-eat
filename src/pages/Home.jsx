import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
import  hero from '../assets/images/hero.mp4'
import sushi from '../assets/images/sushi.jpg'
import mouls from '../assets/images/french/mouls.jpg'
import pizza6 from '../assets/images/italian/pizza6.jpg'

export class Home extends Component {

changeRoute(route){
    this.props.history.push(route)
}
    render() {
let arr =[
    {image: sushi ,route:'/recipe',description:'Japaneese'},
    {image: mouls ,route:'/recipe',description:'French'},
    {image: pizza6 ,route:'/recipe',description:'Italian'},

]
        return (
            <div className="home-page">
                <video width={window.innerWidth} style={{objectFit:'fill'}} height="600" autoPlay loop muted>
                    <source  src={hero} type="video/mp4" />
                </video>
                <div className="main content flex">
                    {arr.map((imageItem, ind)=>{
                        return <img className="tag" onClick={() => this.changeRoute(imageItem.route)} src={imageItem.image} key={`${ind}${imageItem.image}`}></img>

                    })}
                </div>

            </div>
        )
    }
}

