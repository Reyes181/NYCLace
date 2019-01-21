import React from 'react';
import {Switch, Route }  from 'react-router-dom';

import Layout from './components/hoc/layout';
import Auth from './components/hoc/auth';

import Home from './components/Home';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';
import SearchProduct from './components/Products/search_products';
import Jordan from './components/Products/Jordan';
import Nike from './components/Products/Nike';
import Adidas from './components/Products/Adidas';
import Converse from './components/Products/Converse';
import Vans from './components/Products/Vans';
import NewBalance from './components/Products/NewBalance';
import Asics from './components/Products/Asics';
import Puma from './components/Products/Puma';
import Timberland from './components/Products/Timberland';
import Reebok from './components/Products/Reebok';
import MitchellNess from './components/Products/MitchellNess';
import Polo from './components/Products/Polo';
import Palladium from './components/Products/Palladium';
import Fila from './components/Products/Fila';
import ProductPage from './components/Product';

import ResetUser from './components/Reset_User';
import ResetPass from './components/Reset_User/reset_pass';
import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/add_product';
import EditProduct from './components/User/Admin/edit_product';
import ManageCategories from './components/User/Admin/manage_categories';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/update_profile';
import ManageSite from './components/User/Admin/manage_site';

import PageNotFound from './components/utils/page_not_found';

const Routes = () =>  {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
        <Route path="/user/cart" exact component={Auth(UserCart,true)}/>
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile,true)}/>
        <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
        <Route path="/admin/edit_product/:id" exact component={Auth(EditProduct,true)}/>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)}/>
        <Route path="/admin/site_info" exact component={Auth(ManageSite,true)}/>
        
        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>
        <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/reset_user" exact component={Auth(ResetUser,false)}/>
        <Route path="/reset_password/:token" exact component={Auth(ResetPass,false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        <Route path="/all" exact component={Auth(SearchProduct,null)}/>
        <Route path="/jordan" exact component={Auth(Jordan,null)}/>
        <Route path="/nike" exact component={Auth(Nike,null)}/>
        <Route path="/adidas" exact component={Auth(Adidas,null)}/>
        <Route path="/converse" exact component={Auth(Converse,null)}/>
        <Route path="/vans" exact component={Auth(Vans,null)}/>
        <Route path="/new_balance" exact component={Auth(NewBalance,null)}/>
        <Route path="/asics" exact component={Auth(Asics,null)}/>
        <Route path="/puma" exact component={Auth(Puma,null)}/>
        <Route path="/timberland" exact component={Auth(Timberland,null)}/>
        <Route path="/reebok" exact component={Auth(Reebok,null)}/>
        <Route path="/mitchell_&_ness" exact component={Auth(MitchellNess,null)}/>
        <Route path="/polo" exact component={Auth(Polo,null)}/>
        <Route path="/palladium" exact component={Auth(Palladium,null)}/>
        <Route path="/fila" exact component={Auth(Fila,null)}/>
        <Route path="/" exact component={Auth(Home,null)}/>
        
        <Route component={Auth(PageNotFound,null)}/>
      </Switch>  
    </Layout>
  )
  
}

export default Routes;
