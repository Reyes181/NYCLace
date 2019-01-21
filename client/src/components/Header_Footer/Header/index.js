import React, { Component } from 'react';
import MobileHeader from './mobile_header';
import { Link, withRouter } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faUserCirlce from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

class Header extends Component {
    
    state = {
        page:[
            {
                name:'Home',
                linkTo:'/',
                public: true
            }
        ],
        
        Jordan:[
            {
                name:'Jordan',
                linkTo:'/jordan',
                public:true
            }
        ],
        
        Nike:[
            {
                name:'Nike',
                linkTo:'/nike',
                public:true
            }    
        ],
        
        adidas:[
            {
                name:'adidas',
                linkTo:'/adidas',
                public:true
            }    
        ],
        
        Converse:[
            {
                name:'Converse',
                linkTo:'/converse',
                public:true
            }    
        ],
        
        Vans:[
            {
                name:'Vans',
                linkTo:'/vans',
                public:true
            }    
        ],
        
        NewBalance:[
            {
                name:'New Balance',
                linkTo:'/new_balance',
                public:true
            }    
        ],
        
        Asics:[
            {
                name:'Asics',
                linkTo:'/asics',
                public:true
            }    
        ],
        
        PrimeBrand:[
            {
                name:'Jordan',
                linkTo:'/jordan',
                public:true
            }, 
            {
                name:'Nike',
                linkTo:'/nike',
                public:true
            }, 
            {
                name:'adidas',
                linkTo:'/adidas',
                public:true
            }, 
            {
                name:'Converse',
                linkTo:'/converse',
                public:true
            },  
            {
                name:'Vans',
                linkTo:'/vans',
                public:true
            },    
            {
                name:'New Balance',
                linkTo:'/new_balance',
                public:true
            },    
            {
                name:'Asics',
                linkTo:'/asics',
                public:true
            },  
            {
                name:'Puma',
                linkTo:'/puma',
                public:true
            },
            {
                name:'Timberland',
                linkTo:'/timberland',
                public:true
            },
            {
                name:'Reebok',
                linkTo:'/reebok',
                public:true
            },
            {
                name:'Mitchell & Ness',
                linkTo:'/mitchell_&_ness',
                public:true
            },
            {
                name:'Polo',
                linkTo:'/polo',
                public:true
            },
            {
                name:'Palladium',
                linkTo:'/palladium',
                public:true
            },
            {
                name:'Fila',
                linkTo:'/fila',
                public:true
            }
        ],
        
        SubBrand:[
            {
                name:'Puma',
                linkTo:'/puma',
                public:true
            },
            {
                name:'Timberland',
                linkTo:'/timberland',
                public:true
            },
            {
                name:'Reebok',
                linkTo:'/reebok',
                public:true
            },
            {
                name:'Mitchell & Ness',
                linkTo:'/mitchell_&_ness',
                public:true
            },
            {
                name:'Polo',
                linkTo:'/polo',
                public:true
            },
            {
                name:'Palladium',
                linkTo:'/palladium',
                public:true
            },
            {
                name:'Fila',
                linkTo:'/fila',
                public:true
            }
        ],
        
        user:[
            {
                name:'My Cart',
                linkTo:'/user/cart',
                public: false
            },
            {
                name:'My Account',
                linkTo:'/user/dashboard',
                public: false
            },
            {
                name:'Log In',
                linkTo:'/register_login',
                public: true
            },
            {
                name:'Log Out',
                linkTo:'/user/logout',
                public: false
            }
        ]
        
    }
    
    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response =>{
            if(response.payload.success){
                this.props.history.push('/')
            }
        })
    }
    
    cartLink = (item,i) => {
        const user = this.props.user.userData;
        
        return (
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length:0}</span>
                
                    <Link to={item.linkTo}>
                        {item.name}
                    </Link>

            </div>
        )
    }
    
    defaultLink = (item,i) => (
        item.name === 'Log Out' ?
            <a
                className="level0 has-children"
                key={i}
                onClick={()=> this.logoutHandler()}
                href="#/"
            >
                {item.name}
            </a>
        :
        <Link className="level0 has-children" to={item.linkTo} key={i}>
            {item.name}
        </Link>   
    )
    
    defaultSubLink = (item,i) => (
        <Link className="level1" to={item.linkTo} key={i}>
            {item.name}
        </Link>   
    )
    
    showLinks = (type) =>{
        let list = [];
        
        if(this.props.user.userData){
            
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item);
                    }
                }else{
                    if(item.name !== 'Log In'){
                        list.push(item)
                    }
                }
            });
        }
        
        return list.map((item,i)=>{
            if(item.name !== 'My Cart'){
                return this.defaultLink(item,i)
            } else{
                return this.cartLink(item,i)
            }
        })
    }
    
    subLinks = (type) =>{
        let list = [];
        
        if(this.props.user.userData){
            
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item);
                    }
                }else{
                    if(item.name !== 'Log In'){
                        list.push(item)
                    }
                }
            });
        }
        
        return list.map((item,i)=>{
            return this.defaultSubLink(item,i)
        })
    }
    
    render() {
        return (
             <header>
                  <div className="header-row-primary">
                      <div>
                        <Link to={"/"} className="logo"><span>logo</span></Link>
                      </div>
                      <div>
                        {this.showLinks(this.state.user)}
                      </div>
                      <div>
                        {this.showLinks(this.state.page)}
                        <Link style={{paddingLeft:'0.8em'}} to={'/all'}>
                            <FontAwesomeIcon
                            icon={faSearch}
                        />
                        &nbsp;Search
                        </Link>
                      </div>
                      
                  </div>
                  <nav>
                        <div className="header-row-secondary">
                            <div id="header-nav">
                                <nav className="nav">
                                    <ol id="desktop_nav" className="nav-primary">
                                        <li className="level0 nav-2 parent" data-category-name="Jordan">
                                            {this.showLinks(this.state.Jordan)}
                                        </li>
                                        <li className="level0 nav-2 parent" data-category-name="Nike">
                                            {this.showLinks(this.state.Nike)}
                                        </li>
                                        <li className="level0 nav-2 parent" data-category-name="adidas">
                                            {this.showLinks(this.state.adidas)}
                                        </li>
                                        <li className="level0 nav-2 parent" data-category-name="Converse">
                                            {this.showLinks(this.state.Converse)}
                                        </li>
                                        <li className="level0 nav-2 parent" data-category-name="Vans">
                                            {this.showLinks(this.state.Vans)}
                                        </li>
                                        <li className="level0 nav-2 parent" data-category-name="New Balance">
                                            {this.showLinks(this.state.NewBalance)}
                                        </li>
                                        <li className="level0 nav-2 parent" data-category-name="Asics">
                                            {this.showLinks(this.state.Asics)}
                                        </li>
                                        <li id="more_brands" className="level0 nav-2 parent" data-category-name="More Brands">
                                            <a href="/" className="level0 has-children" style={{marginTop: "-0.8em", marginLeft: "-3em"}}>More Brands</a>
                                             <div className="nav-col-wrapper">
                                                <div className="nav-col-wrapper-inner">
                                                    <div className="nav-col">
                                                        <ul className="level1" style={{display: "flex"}}>
                                                            <li className="level1 nav-2-1 first" data-category-name="Puma">
                                                                {this.subLinks(this.state.SubBrand)}
                                                            </li>
                                                            
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div> 
                                        </li>
                                    </ol>
                                     <ol id="ipad_nav" className="nav-primary">
                                        <li className="level0 nav-2 parent" data-category-name="Jordan">
                                            {this.showLinks(this.state.PrimeBrand)}
                                        </li>
                                        
                                    </ol>
                                </nav>
                            </div>
                            <MobileHeader/>
                        </div>
                  </nav>
              </header>
          );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));