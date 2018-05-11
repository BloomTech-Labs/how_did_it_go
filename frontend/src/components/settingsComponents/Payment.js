import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from '../stripeComponents/CheckoutForm';

class Payment extends Component{
    render() {
        return (
            <div>
                {/*STRIPE API MAKE A PAYMENT*/}
<<<<<<< HEAD
                <div className='title'>Make a Payment</div>
=======
                <div className='header'>Make a Payment</div>
>>>>>>> 052da98df943f4ad45ec6829ea7f47001129744e
                    <Elements>
                        <InjectedCheckoutForm />
                    </Elements>
            </div>
        );
    }
}

export default Payment;