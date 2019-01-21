import React from 'react';
import MyButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
    document.title = 'Login - NYCLace';
    return (
        <div id="register_form" className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <img src="https://res.cloudinary.com/reyes181/image/upload/v1541806123/random/z_reptile01.png" alt="logo"/>
                    <div className="left">
                        <h2>New Customers</h2>
                        <p>
                          Creating an account has many benefits: check out faster, keep more than one address, track orders and more.
                        </p>
                        <MyButton
                            type="default"
                            title="Create Account"
                            linkTo="/register"
                            addStyles={{
                                margin: '10px auto'
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered Customers</h2>
                        <p>
                            If you have an account, sign in with your email address.
                        </p>
                        <Login/>
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default RegisterLogin;