import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from '../stripeComponents/CheckoutForm';

class Payment extends Component{
    render() {
        return (
            <div>
                {/*STRIPE API MAKE A PAYMENT*/}
                <div className='header'>Make a Payment</div>
                    <Elements>
                        <InjectedCheckoutForm />
                    </Elements>
            </div>
        );
    }
}

export default Payment;