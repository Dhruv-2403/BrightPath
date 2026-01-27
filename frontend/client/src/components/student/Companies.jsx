import React from 'react';
import { assets } from '../../assets/assets';

const Companies = () => {
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-10 border-y border-gray-100 bg-gray-50/50">
      <p className="text-center text-gray-400 font-medium mb-8 text-sm uppercase tracking-widest">
        Trusted by learners at top companies
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition duration-500">
        <img src={assets.microsoft_logo} alt="Microsoft" className="w-24 md:w-32" />
        <img src={assets.walmart_logo} alt="Walmart" className="w-24 md:w-32" />
        <img src={assets.accenture_logo} alt="Accenture" className="w-24 md:w-32" />
        <img src={assets.adobe_logo} alt="Adobe" className="w-24 md:w-32" />
        <img src={assets.paypal_logo} alt="PayPal" className="w-24 md:w-32" />
      </div>
    </div>
  );
};

export default Companies;
