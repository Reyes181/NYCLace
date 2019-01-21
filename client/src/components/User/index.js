import React from 'react';
import UserLayout from '../hoc/user_layout';
import MyButton from '../utils/button';
import UserHistoryBlock from '../utils/User/history_block';

const UserDashboard = ({user}) => {
    document.title = 'User Account - NYCLace';
    return (
        <UserLayout>
            <div>
                
                <div className="user_nfo_panel">
                    <h1>Account Information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <MyButton
                        type="default"
                        title="Edit Account Info"
                        linkTo="/user/user_profile"
                    />
                </div>
                {
                    user.userData.history ?
                        <div className="user_nfo_panel">
                            <h1>Purchase History</h1>
                            <div className="user_product_block_wrapper">
                                <UserHistoryBlock
                                    products={user.userData.history}
                                />
                            </div>
                        </div>
                    :null
                }
            </div>
        </UserLayout>    
    );
};

export default UserDashboard;