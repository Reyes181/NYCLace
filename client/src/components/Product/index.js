import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import Ad from '../utils/Ad';
import ProdNfo from './prodNfo';
import ProdImg from './prodImg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../actions/products_actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardBlockShop from '../utils/card_block';
import Dialog from '@material-ui/core/Dialog';
import { getRandomProduct } from '../../actions/products_actions';
import { addToCart } from '../../actions/user_actions';

class ProductPage extends Component {
    
    state = {
        addSuccess: false
    }
    
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(response=>{
            if(!this.props.products.prodDetail){
                this.props.history.push('/');
                alert('Product Not Found');
            }
        })
        this.props.dispatch(getRandomProduct());
        window.scrollTo(0, 0)
    }
    
    componentWillUnmount(){
        this.props.dispatch(clearProductDetail())
    }
    
    addToCartHandler(id){
       this.props.dispatch(addToCart(id))
        setTimeout(()=>{
            this.setState({
               addSuccess:false
           })
        },2000)
        this.setState({
           addSuccess:true
       })
    }
    
    
    render(){
        console.log(this.state.size)
        return (
            <div style={{marginTop: '5em'}}>
                <PageTop
                    title="Product Detail"
                />
                <div className="prod_container">
                    {
                        this.props.products.prodDetail ?
                            <div className="product_detail_wrapper">
                                <div className="info_box">
                                    <div className="left">
                                        <div className="image_view">
                                            <ProdImg
                                                detail={this.props.products.prodDetail}
                                            />
                                        </div>
                                        
                                    </div>
                                    {this.props.user.userData.isAdmin ?
                                        <Link
                                            id='edit_button'
                                            stlye={{color:'red'}}
                                            className="link_default"
                                            to={`/admin/edit_product/${this.props.match.params.id}`}
                                        >
                                            Edit
                                        </Link>
                                        : null
                                    }
                                    <div className="right">
                                        <ProdNfo
                                            detail={this.props.products.prodDetail}
                                            addToCart={(id) => this.addToCartHandler(id)}
                                        />
                                    </div>
                                </div>
                                <CardBlockShop
                                  list={this.props.products.randomProduct}
                                  title={'More selections below'}
                                />
                                <div style={{paddingBottom:'5em'}}>
                                    <Ad/>
                                </div>
                            </div>
                        :   <CircularProgress
                                style={{color:'#0c0c0c'}}
                                thickness={7}
                            />
                    }
                    
                </div>
                <Dialog open={this.state.addSuccess}>
                    <div className="dialog_alert">
                        <div>Successfully Added To Cart</div>
                    </div>
                </Dialog>
            
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        user: state.user
    }
}

export default connect(mapStateToProps)(ProductPage);