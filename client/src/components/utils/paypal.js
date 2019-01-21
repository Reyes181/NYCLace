import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    render() {
        
        const onSuccess = (payment) => {
            this.props.onSuccess(payment);
        }
        
        const onCancel = (data) => {
            
        }
        
        const onError = (err)=> {
            
        }
        
        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay;
        
        const client = {
            sandbox:'AdBN3yFMw9s78FFskCmSRlglq3xJTLihWY1uSDMCYDzg4eKTfQ6BdIaOwEE3rXZfdgOCmp2sL_HANC55',
            production:''
        }
        
        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        layout: 'horizontal',
                        size: 'responsive',
                        shape: 'rect',
                        color: 'blue'
                    }}
                />
            </div>    
        )
    }
}

export default Paypal;