import React from 'react';
import MyButton from '../utils/button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';


const ProdNfo = (props) => {
    document.title = `${props.detail.name} - NYCLace`
    const showProdTags = (detail) => (
        <div className="product_tags">
            {
                detail.shipping ?
                    <div className="tag">
                        <div><FontAwesomeIcon icon={faTruck}/></div>
                        <div className="tag_text">
                            <div>Free Shipping</div>
                            <div>And return</div>
                        </div>
                    </div>
                :null
            }
            {
                detail.available ?
                    <div className="tag">
                        <div><FontAwesomeIcon icon={faCheck}/></div>
                        <div className="tag_text">
                            <div>Available</div>
                            <div>in store</div>
                        </div>
                    </div>
                :
                    <div className="tag">
                        <div><FontAwesomeIcon icon={faTimes}/></div>
                        <div className="tag_text">
                            <div>Not Available</div>
                            <div>Out of stock</div>
                        </div>
                    </div>
            }
        </div>
            
    )

    
    const showProdActions = (detail) => (
        
        <div className="product_actions">
            <div className="cart">
                <MyButton
                    type="add_to_cart_link"
                    runAction={()=>{
                       props.addToCart(detail._id)
                    }}
                />
            </div>
            <div style={{color: '#999592'}}>*must be logged in to add product to cart and purchase</div>
        </div>    
    )
    
    const showCategoryColors = (detail) => (
        detail.color ?
            detail.color.map((item,i)=>(
                <span className="item" key={i}>
                    {item}
                </span>    
            ))
        :null
    )
    
    const showSize = (detail) => (
        detail.shoesize ?
            <span className="item" style={{fontSize: '1.5em'}}>
                {detail.shoesize}
            </span>
        :
        detail.clothesize ?
            <span className="item">
                {detail.clothesize}
            </span>
        :
        null
            
    )
    
    const showProdSpecifications = (detail) => (
         <div className="product_specifications">
            {showCategoryColors(detail)}
            &nbsp;||&nbsp;
            <span className="item">
                {detail.style}
            </span>
         </div>
    )
    
    const detail = props.detail
    
    return (
        <div>
            <div style={{textAlign:'center', paddingTop:'1.5em'}}>
                <div className='prod_header_bold' style={{borderTtop: '1px solid #d3d3d3'}}>{detail.brand.name}</div>
                <div className='prod_header'>{detail.name}</div>
                <div className='prod_header_bold'>{detail.footwear.style}</div>
                <div className="prod_header_price">${detail.price}</div>
                {showProdActions(detail)}
            </div>
            <p>{detail.description}</p>
            <div className='prod_header_size'>Size&nbsp;{showSize(detail)}</div>
            {showProdSpecifications(detail)}
            {showProdTags(detail)}
            
        </div>    
    )
};

export default ProdNfo;