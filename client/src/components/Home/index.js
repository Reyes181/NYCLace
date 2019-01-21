import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import CardBlock from '../utils/card_block';
import Ad from '../utils/Ad';

import { connect } from 'react-redux';
import { getProductByArrival, getProductsBySell } from '../../actions/products_actions';

class Home extends Component {
  
    componentDidMount(){
      this.props.dispatch(getProductByArrival());
      this.props.dispatch(getProductsBySell());
      document.title = 'Home - NYCLace';
    }
  
    render() {
        return (
          <div>
            <HomeSlider/>
            <CardBlock
              list={this.props.products.bySell}
              title="Top Sellers"
            />
            <div className="site_promo" style={{
                  background:'url(https://pbs.twimg.com/media/DPKqpADW0AUu-g0.jpg)', 
            }}>
              <div className="site_promo_header">Sign up to shop and enjoy free shipping on all purchases!</div>
            </div>
            <CardBlock
              list={this.props.products.byArrival}
              title="New Arrivals"
            />
            <Ad/>
            <HomePromotion/>
          </div>  
        );
    }
}

const mapStateToProps = (state) => {
  return {
      products: state.products
  }
}

export default connect(mapStateToProps)(Home);