import React from 'react';

import { Link } from 'react-router-dom';

const HomePromotion = (props) => {
    
    
    
    const subPromotion = [
         {
            img:'/images/featured/mini_promo_adidas.png',
            linkTitle:'Shop Now',
            linkTo:'/adidas'
        },
        {
            img:'/images/featured/mini_promos_vans.png',
            linkTitle:'Shop Now',
            linkTo:'/Vans'
        },
        {
            img:'/images/featured/mini_promos_balance.png',
            linkTitle:'Shop Now',
            linkTo:'/NewBalance'
        },
        {
            img:'/images/featured/mini_promos_foam.png',
            linkTitle:'Shop Now',
            linkTo:'/Nike'
        },
        {
            img:'/images/featured/mini_promos_jordan.png',
            linkTitle:'Shop Now',
            linkTo:'/Jordan'
        },
        {
            img:'/images/featured/mini_promos_filas.png',
            linkTitle:'Shop Now',
            linkTo:'/Fila'
        }
    ]
        
    
    
    
    const generateSlides = () => (
        subPromotion ?
            subPromotion.map((item,i)=>(
                    <Link
                        key={i} to={item.linkTo}
                    >
                        <li className="promo_img"
                            style={{
                                background:`url(${item.img})`,
                            }}
                        ></li>  
                    </Link>
            ))
        :null
    )
    
    
    return (
        <section className="home_promotion">
            <ul className="home_promotion_grid">
                {generateSlides()}
            </ul>
        </section>    
    );
};

export default HomePromotion;