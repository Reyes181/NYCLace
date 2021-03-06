import React from 'react';
import UserLayout from '../../hoc/user_layout';
import UpdateSiteNfo from './update_site_nfo';

const ManageSite = () => {
    return (
        <div>
            <UserLayout>
                <UpdateSiteNfo/>
            </UserLayout>
        </div>    
    );
};

export default ManageSite;