import React, { Component } from 'react'
var Carousel = require('react-responsive-carousel').Carousel;

export class ImageCarousel extends Component {
    render() {
        const images = this.props.images;
        //onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
        return (

            <Carousel showArrows={true} >
                {
                    images.map((image, ind) => {
                        return (
                            <div key={`gallery-image-${ind}`}>
                                <img src={image} alt={`${this.props.recipeName}`} />
                                <p className="legend">{this.props.recipeName}</p>
                            </div>

                        )
                    })
                }
            </Carousel>
        );
    }
}