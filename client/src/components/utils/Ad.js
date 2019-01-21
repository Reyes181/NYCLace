import React, { Component } from 'react';


class Ad extends Component {
    state ={
        imageURLs: [
            'https://res.cloudinary.com/reyes181/image/upload/v1546963471/random/toy_story_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1539061714/random/creditkarma_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1546963471/random/glade_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1539062591/random/geico_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1539063257/random/pringles_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1546963471/random/walmart_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1539065483/random/target_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1546963471/random/detective_pikachu_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1546963472/random/chilis_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1546968615/random/tide_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1546968615/random/tacobell_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1546968615/random/modells_ad.png',
            'https://res.cloudinary.com/reyes181/image/upload/v1546968615/random/cheerios_ad.png'
        ]
    }
    
    getImageTag = () => {
        var img = '"';
        var randomIndex = Math.floor(Math.random() * this.state.imageURLs.length);
        img += this.state.imageURLs[randomIndex];
        img += '"';
        return img;
    }
    
    render() {
        return (
            <div
                style={{
                    background: `url(${this.getImageTag()})`,
                }}
                className='ad_banner'
            >
                <i className="fa fa-window-close" aria-hidden="true"></i>
            </div>    
        );
    }
}

export default Ad;