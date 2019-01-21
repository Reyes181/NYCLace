import React from 'react';
import moment from 'moment';

const UserHistoryBlock = (props) => {
    
    const renderBlocks = () => (
        props.products ?
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td>{product.porder}</td>
                    <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
                    <td style={{
                        maxWidth:'25ch', 
                        overflow:'hidden',
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        textAlign: 'left'
                    }}>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.qty}</td>
                </tr>    
            ))
        :null
    )
    
    return (
        <div className="history_blocks" style={{overflowX:'auto'}}>
            <table style={{width: '100%', textAlign: 'center'}}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date of Purchase</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>    
    )
};

export default UserHistoryBlock;