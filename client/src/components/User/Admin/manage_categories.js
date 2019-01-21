import React from 'react';
import UserLayout from '../../hoc/user_layout';
import ManageBrands from './manage_brands';
import ManageFootwears from './manage_footwears';

const ManageCategories = () => {
    return (
        <UserLayout>
            <ManageBrands/>
            <ManageFootwears/>
        </UserLayout>    
    )
}

export default ManageCategories;