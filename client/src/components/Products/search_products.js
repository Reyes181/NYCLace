import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/products_actions';
import SearchEngine from './search_filter';

class SearchProduct extends Component {
    
    constructor() {
      super();
      this.state = {
        search: '',
        currentPage: 1,
        todosPerPage: 16,
        filter:''
      };
      this.handleClick = this.handleClick.bind(this);
    }
    
     componentDidMount(){
        this.props.dispatch(getProducts())
        document.title =  'Search - NYCLace';
     }
    
    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }
    
    updateSearch(event){
        this.setState({
            search: event.target.value.substr(0,20),
        });
    }
    
    updateFilter(event){
        this.setState({
          filter: event.target.value
        });
    }
    
    render() {
        return (
          <div>
              {this.props.products.getProd ?
                <SearchEngine
                  Lists={this.props.products.getProd}
                  search={this.state.search}
                  currentPage={this.state.currentPage}
                  todosPerPage={this.state.todosPerPage}
                  handleClick={this.handleClick}
                  updateSearch={this.updateSearch.bind(this)}
                  filter={this.state.filter}
                  updateFilter={this.updateFilter.bind(this)}
                />
                :null
              }
          </div>
          
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}


export default connect(mapStateToProps)(SearchProduct);