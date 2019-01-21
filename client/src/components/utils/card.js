import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Card extends Component {
    
    renderCardImages(images){
        if(images.length > 0){
                return images[0].url ?
                     images[0].url
                : images[0]
        }else{
            return '/images/image_not_available.png'
        }
    }
    
    render() {
        const props = this.props;
        return (
            <div className='card_item_wrapper'>
                <Link to={`/product_detail/${props._id}`}>
                    <div
                        className="image"
                        style={{
                            background:`url(${this.renderCardImages(props.images)}) no-repeat`
                        }}
                    >
                    </div>
                    <div className="action_container">
                        <div className="tags">
                            <div className="brand">{props.brand.name}</div>
                            <div className="name">{props.name}</div>
                            <div className="price">${props.price}</div>
                        </div>
                    </div>
                </Link>
            </div>    
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);