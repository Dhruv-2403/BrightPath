import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StripePayment = ({ courseData, clientSecret, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppContext);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            toast.error(error.message);
            setProcessing(false);
        } else {
            if (paymentIntent.status === 'succeeded') {
                toast.success("Payment Successful! Enrolling you now...");
                navigate('/loading/my-enrollments');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-gray-900">Secure Checkout</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                        <img src={courseData.courseThumbnail} className="w-20 h-12 object-cover rounded-lg" alt="" />
                        <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{courseData.courseTitle}</p>
                            <p className="text-indigo-600 font-black text-lg">${(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-inner">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                        </div>

                        <button
                            disabled={!stripe || processing}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition disabled:opacity-50 shadow-lg shadow-indigo-100"
                        >
                            {processing ? "Processing..." : `Pay ${(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}`}
                        </button>
                        <p className="text-center text-xs text-gray-400">
                            🔒 Payments are secure and encrypted.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StripePayment;
