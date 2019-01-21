import React from 'react';
import Slider from 'react-slick';

const HomeSlider = (props) => {
    
    const slides = [
        {
            img:'/images/featured/shoe_jordan.png'
        },
        {
            img:'/images/featured/shoe2.jpg'
        },
        {
            img:'/images/featured/shoe_vans.png'
        } 
    ]
    
    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        
    }
    
    const generateSlides = () => (
        slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="featured_image"
                        style={{
                            background:`url(${item.img})`,
                        }}
                    ></div>  
                </div>    
            ))
        :null
    )
    
    return (
        <div className="featured_container">
            <Slider {...settings}>
                {generateSlides()}
            </Slider>
        </div>    
    );
};

export default HomeSlider;