import React, { Component } from 'react';
import UserLayout from '../hoc/user_layout';
import UserProductBlock from '../utils/User/product_block';
import Paypal from '../utils/paypal';

import { connect } from 'react-redux';
import { getCartItems, removeCartItem, removeQty, addQty, onSuccessBuy } from '../../actions/user_actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';




class UserCart extends Component {
    
    state = {
        loading: true,
        total:0,
        showSuccess: false,
        showTotal: false,
        showQty: true
    }
    
    componentDidMount(){
        let cartItems = [];
        let user = this.props.user;
        
        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                });
                
                this.props.dispatch(getCartItems(cartItems,user.userData.cart))
                .then(()=>{
                    if(this.props.user.cartDetail.length > 0){
                        this.calculateTotal(this.props.user.cartDetail);
                    }
                })
            }
        }
        document.title = 'User Account - NYCLace';
    }
    
    calculateTotal = (cartDetail) => {
        let total = 0;
        
        cartDetail.forEach(item=>{
            if(item.qty >= item.quantity){
                total += parseInt(item.price, 10) * item.quantity;
            }else {
                 total += parseInt(item.price, 10) * item.qty;
            }
        });
        
        this.setState({
            total,
            showTotal: true
        });
    }
    
    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(()=>{
            if(this.props.user.cartDetail.length <= 0){
                this.setState({
                    showTotal: false
                })
            } else{
                this.calculateTotal(this.props.user.cartDetail)
            }
        })
    }
    
    removeQtyItem = (id) => {
        this.props.dispatch(removeQty(id))
        
        .then(()=>{
            window.location.reload();
            if(this.props.user.cartDetail[0].qty < 0){
                 this.props.dispatch(removeCartItem(id))
            }
        })
        
    }
    
    addQtyItem = (id) => {
        this.props.dispatch(addQty(id))
        
        
        
    }
    
    showNoItemMessage = () => (
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown}/>
            <div>
                Cart is empty
            </div>
        </div> 
    )
    
    transactionError = (data) => {
        alert('Paypal error!');
    }
    
    transactionCanceled = (data) => {
        alert('Paypal transaction canceled');
    }
    
    transactionSuccess = (data) => {
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail,
            paymentData: data
        })).then(()=>{
            if(this.props.user.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
    }
    
    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id)=> this.removeFromCart(id)}
                            removeQtys={(id)=> this.removeQtyItem(id)}
                            addQtys={(id)=> this.addQtyItem(id)}
                        />
                        { this.state.showTotal ?
                            <div>
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                            </div>
                          :
                            this.state.showSuccess ?
                                <div className="cart_no_items">
                                    <FontAwesomeIcon icon={faSmile}/>
                                    <div>
                                        Order is proccessing
                                    </div>
                                    <div>
                                        Invoice and confirmation of purchases will be sent to your email address.
                                        Keep up to date of purchase in your order history.
                                    </div>
                                </div> 
                            :
                                this.showNoItemMessage()
                        }
                    </div>
                    {
                        this.state.showTotal ?
                            <div className="paypal_button_container">
                                <Paypal
                                    toPay={this.state.total}
                                    transactionError={(data)=> this.transactionError(data)}
                                    transactionCanceled={(data)=> this.transactionCanceled(data)}
                                    onSuccess={(data)=> this.transactionSuccess(data)}
                                />
                            </div>
                        :null
                    }
                </div> 
            </UserLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart)