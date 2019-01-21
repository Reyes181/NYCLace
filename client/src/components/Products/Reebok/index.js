import React, { Component } from 'react';
import PageTop from '../../utils/page_top';
import reebokBanner from '../../../Resources/banners/Reebok.png';
import { sizes, clothe_sizes, colors, price } from '../../utils/Form/fixed_categories';

import { connect } from 'react-redux';
import { getProductsToShop, getModels, getFootwears } from '../../../actions/products_actions';

import CollapseCheckbox from '../../utils/collapseCheckbox';
import CollapseCheckboxId from '../../utils/collapseCheckbox_id';
import CollapseButton from '../../utils/collapseButton';
import CollapseRadio from '../../utils/collapseRadio';

import LoadmoreCards from '../loadmoreCards';
import CircularProgress from '@material-ui/core/CircularProgress';
import FreeScrollBar from 'react-free-scrollbar';

class Reebok extends Component {
    
    state = {
        isFetching:true,
        limit:12,
        skip:0,
        filters:{
            model:[],
            footwear:[],
            shoesize:[],
            clothesize:[],
            colors:[],
            price:[]
        },
        id:'5bd3e16bfa61e106c24fa101'
    }
    
    componentDidMount(){
        const id = this.state.id
        this.props.dispatch(getModels(id));
        this.props.dispatch(getFootwears());
    
        this.props.dispatch(getProductsToShop(
            id,
            this.state.skip,
            this.state.limit,
            this.state.filters,
        ))
        this.setState({
            isFetching: false
        });
        document.title = 'Reebok - NYCLace';
    }
    
    handlePrice = (value) => {
        const data = price;
        let array = [];
        
        for(let key in data){
            if(data[key]._id === parseInt(value,10)){
                array = data[key].array
            }
        }
        
        return array
    }
    
   
    
    handleFilters = (filters,category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters;
        
        if(category === 'price'){
            let priceValues = this.handlePrice(filters);
            newFilters[category] = priceValues
        }

        this.showFilteredResults(newFilters)
        
        this.setState({
            filters: newFilters
        })
    }
    
    showFilteredResults = (filters) => {
        const id = this.state.id;
        this.props.dispatch(getProductsToShop(
            id,
            0,
            this.state.limit,
            filters
        )).then(()=>{
            this.setState({
                skip:0
            })
        })
    }
    
    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit;
        const id = this.state.id;
        this.props.dispatch(getProductsToShop(
            id,
            skip,
            this.state.limit,
            this.state.filters,
            this.props.products.toShop
        )).then(()=>{
            this.setState({
                skip
            })
        })
    }
    
    render() {
        const products = this.props.products;
        return (
            <div className="brand_page">
                <div className="product_banner" style={{background:`url(${reebokBanner})`}}></div>
                <div>
                    <PageTop
                        title="Reebok Brand"
                    />
                    <div className="container">
                        <div className="shop_wrapper">
                            <div className="left">
                               
                               <CollapseCheckbox
                                initState={false}
                                title="Models"
                                list={products.models}
                                handleFilters={(filters)=> this.handleFilters(filters,'model')}
                               />
                               
                               <CollapseCheckboxId
                                initState={false}
                                title="Product Type"
                                list={products.footwears}
                                handleFilters={(filters)=> this.handleFilters(filters,'footwear')}
                               />
                               
                               <CollapseCheckbox
                                initState={false}
                                title="Footwear Size"
                                list={sizes}
                                handleFilters={(filters)=> this.handleFilters(filters,'shoesize')}
                               />
                               
                               <CollapseCheckbox
                                initState={false}
                                title="Apparel Size"
                                list={clothe_sizes}
                                handleFilters={(filters)=> this.handleFilters(filters,'clothesize')}
                               />
                               
                               <CollapseButton
                                initState={false}
                                title="Color"
                                list={colors}
                                handleFilters={(filters)=> this.handleFilters(filters,'colors')}
                               />
                               
                               <CollapseRadio
                                initState={false}
                                title="Price"
                                list={price}
                                handleFilters={(filters)=> this.handleFilters(filters,'price')}
                               />
                               
                            </div>
                            <div className="right" style={{maxHeight: '100%', overflow:'auto'}}>
                                <FreeScrollBar
                                    autohide={true}
                                    onScrollbarScrollTimeout={100}
                                    timeout={0}
                                    tracksize={'0px'}
                                    style={{height: '100%'}}
                                >
                                    { !this.state.isFetching ? 
                                       <LoadmoreCards
                                        grid={this.state.grid}
                                        limit={this.state.limit}
                                        size={products.toShopSize}
                                        products={products.toShop}
                                        loadMore={()=> this.loadMoreCards()}
                                       />
                                    :
                                    
                                        <CircularProgress
                                             style={{ 
                                                color: '#004C54'
                                             }} 
                                             thickness={7}
                                        />
                                        
                                    }
                                </FreeScrollBar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Reebok);