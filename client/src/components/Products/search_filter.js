import React from 'react';
import CardBlock from '../utils/card_block';

const SearchEngine = (props) => {
    let Lists = props.Lists.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase(),undefined, {numeric: true}))
    let filteredContacts = Lists.filter(
        (List) => {
            return List.name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1;
        }
    );;

    // Logic for displaying todos
    const indexOfLastTodo = props.currentPage * props.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - props.todosPerPage;
    const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
    
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredContacts.length / props.todosPerPage); i++) {
      pageNumbers.push(i);
    }

    var sorted_products = currentTodos.sort((a,b) => {
        return new Date(a.createdAt).getTime() - 
            new Date(b.createdAt).getTime()
    });
    
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={props.handleClick}
        >
          {number}
        </li>
      );
    }
    );
    return (
      <div>
          <div style={{marginTop:'5em'}}>
            <input className='searchBar' placeholder='air jordan 7...' onChange={props.updateSearch} type="text" value={props.search}/>
          </div> 
          <hr className="style13"/>
          <p>Sort options</p>
          <div className="styled-select black semi-square">
            <select onChange={props.updateFilter}>
              <option>Recommended</option>
              <option value="high">Price High - Low</option>
              <option value="low">Price Low - High</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
          {
            props.filter === 'high' ?
              <CardBlock
                list={currentTodos.sort((a, b) => a.price < b.price ? 1 : -1)}
              />
            :
            props.filter === 'low' ?
              <CardBlock
                list={currentTodos.sort((a, b) => a.price > b.price ? 1 : -1)}
              />
            :
            props.filter === 'recent' ?
              <CardBlock
                list={sorted_products.reverse()}
              />
            :
             <CardBlock
                list={currentTodos}
              />
          }
          <div id="page-numbers" style={{paddingBottom:'0px'}}>
            <p style={{fontSize:'1.8em'}}>Page {props.currentPage} of {pageNumbers[pageNumbers.length-1]}</p>
          </div>
          <ul id="page-numbers">

            {renderPageNumbers}
          </ul>
      </div>
      
    );
};


export default SearchEngine;