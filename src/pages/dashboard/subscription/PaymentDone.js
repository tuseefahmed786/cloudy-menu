import { useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import React, { useEffect } from 'react';

const PaymentDone = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');
            const verifyPayment = async () => {
                try {
                    const response = await axios.get(`/verify-payment`, {
                        params: { sessionId },
                    });

                    console.log('Payment verified:', response.data);

                    // Navigate to billing page
                    navigate('/dashboard/billing', { replace: true });

                    // Remove session_id from URL to prevent re-verification
                    window.history.replaceState(null, '', '/dashboard/billing');
                } catch (error) {
                    console.error('Error verifying payment:', error);
                }
            };

            verifyPayment();
    
    }, [navigate]);

    return <div>
        .....isLoading
    </div>;
};

export default PaymentDone;
