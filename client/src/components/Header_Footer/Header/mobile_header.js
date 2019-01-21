import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

class MobileHeader extends Component {
    state ={
        width: "0",
        
        page:[
            {
                name:'Home',
                linkTo:'/',
                public: true
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
    
    openNav = (e) => {
        this.setState({
            width: "100%"
        })
    };
        
    closeNav = (e) =>{
        this.setState({
            width: "0"
        })
    };
    
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
                <Link t0={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }
    
    defaultLink = (item,i) => (
        item.name === 'Log Out' ?
            <a 
                key={i}
                onClick={()=> this.logoutHandler()}
                href="#/"
            >
                {item.name}
            </a>
        :
        <Link onClick={this.closeNav} to={item.linkTo} key={i}>
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
    
    render() {
        return (
            <div className="mobileHeader">
                <div id="mySidenav" className="sidenav" style={{width: this.state.width, zIndex: '3'}}>
                  <span className="closebtn" onClick={this.closeNav}>&times;</span>
                  {this.showLinks(this.state.PrimeBrand)}
                </div>    
                
                <span className="brands" onClick={this.openNav}>BRANDS</span>
            </div>
        )
    }
    
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default  connect(mapStateToProps)(withRouter(MobileHeader));