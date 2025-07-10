import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-blue-800 w-full p-4 sm:p-5 md:p-6 lg:p-8 pt-20 sm:pt-16 md:pt-20 lg:pt-24">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8 mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-6 pb-3 border-b border-blue-200">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-blue-900">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">1. Introduction</h2>
            <p className="mb-3">
              At TrackAdemy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our Learning Management System ("LMS").
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
              please do not access the application.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">2. Information We Collect</h2>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Personal Data</h3>
              <p className="mb-2">We may collect personally identifiable information, such as:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Date of birth</li>
                <li>Education information</li>
                <li>Payment information</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Usage Data</h3>
              <p className="mb-2">We may also collect information on how the LMS is accessed and used, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Log and usage data</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Pages visited</li>
                <li>Time and date of your visit</li>
                <li>Course progress and completion data</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, operate, and maintain the LMS</li>
              <li>Create and manage your account</li>
              <li>Process your payments</li>
              <li>Send administrative information, such as updates and security alerts</li>
              <li>Respond to comments, questions, and requests</li>
              <li>Track and analyze trends, usage, and activities in connection with the LMS</li>
              <li>Improve the LMS and educational content</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">4. Disclosure of Your Information</h2>
            <p className="mb-3">We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Service providers who assist us in operating the LMS</li>
              <li>Educational partners for course delivery and certification</li>
              <li>Legal authorities when required by law</li>
              <li>Other users, when you choose to share information through the LMS (such as discussion forums)</li>
            </ul>
            <p className="mt-3">
              We do not sell, trade, or otherwise transfer your personally identifiable information to third parties for marketing purposes.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">5. Data Security</h2>
            <p className="mb-3">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
              storage is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">6. Your Data Rights</h2>
            <p className="mb-3">Depending on your location, you may have certain rights regarding your personal data, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The right to access personal data we hold about you</li>
              <li>The right to request correction of inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">7. Children's Privacy</h2>
            <p>
              The LMS is not intended for individuals under the age of 13. We do not knowingly collect personal information 
              from children under 13. If we learn we have collected personal information from a child under 13, we will 
              delete that information promptly.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
              privacy policy on this page and updating the "Last Updated" date.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">9. Contact Us</h2>
            <p className="mb-3">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="font-medium text-blue-700">trackademy@gmail.com</p>
          </section>
        </div>
        
        <div className="mt-10 pt-6 border-t border-blue-200 flex justify-between">
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Back to Registration
          </Link>
          <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
            Terms of Service
          </Link>
        </div>
        
        <div className="text-center mt-6 text-sm text-blue-600">
          Last Updated: July 10, 2025
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
