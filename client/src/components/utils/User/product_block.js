import React from 'react';
import { Link } from 'react-router-dom';


const UserProductBlock = ({products, removeItem, removeQtys, addQtys}) => {
    
    const renderCardImages = (images) => {
        if(images.length > 0){
                return images[0].url ?
                     images[0].url
                : images[0];
        }else{
            return '/images/image_not_available.png';
        }
    };
    
    const showSize = (product) => (
        product.shoesize ?
            <div>
                {product.shoesize}
            </div>
        :
        product.clothesize ?
            <div>
                {product.clothesize}
            </div>
        :
        null
            
    )
     const hideOption = (product) => (
        product.qty === 1 ?
            null
        :
       <div
            className="btn_d"
            onClick={()=> removeQtys(product._id)}
        >
            -
        </div> 

     )
     
     const hideOptionB = (product) => (
        product.qty >= product.quantity ?
            null
        :
        
        <div
            style={{marginLeft: '.5em'}}
            className="btn_d"
            onClick={()=> addQtys(product._id)}
        >
            +
        </div> 
     )
     
    const maxQty = (product) => (
        product.qty >= product.quantity ?
            <div>{product.quantity}</div>
        :
            <div>{product.qty}</div>
    )
    
    const renderItems = () => (
        
        products.cartDetail ?
            products.cartDetail.map(product=>(
                <div className="user_product_block" key={product._id}>
                    <div className="item" style={{flexBasis: '10%'}}>
                        <div
                            className="image"
                            style={{background:`url(${renderCardImages(product.images)}) no-repeat`}}
                        ></div>
                    </div>
                    <div className="image" style={{flexBasis: '30%'}}>
                        <div className="item">
                            <h4>Product Name</h4>
                                <div>{product.brand.name}</div>
                                <Link to={`/product_detail/${product._id}`}>
                                     {product.name}
                                </Link>
                            
                        </div>
                        <div className="item">
                            <h4>Quantity</h4>
                            <div className="qty">
                                {maxQty(product)}
                                <div style={{flexBasis: '60%'}}>
                                    {hideOption(product)}
                                    {hideOptionB(product)}
                                </div>
                            </div>
                        </div>
                        <div className="item" style={{display: 'flex'}}>
                            <div className="item" style={{flexBasis: '30%'}}>
                                <h4>Size</h4>
                                {showSize(product)}
                            </div>
                            <div className="item" style={{flexBasis: '70%'}}>
                                <h4>Price</h4>
                                <div>
                                    $ {product.price}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item btn">
                        <div
                            className="cart_remove_btn"
                            onClick={()=> removeItem(product._id)}
                        >
                            Remove
                        </div>
                    </div>
                </div>    
            ))
        :null
    )
    
    return (
        <div>{renderItems()}</div>    
    );
};

export default UserProductBlock;