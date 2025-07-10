import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-blue-800 w-full p-4 sm:p-5 md:p-6 lg:p-8 pt-20 sm:pt-16 md:pt-20 lg:pt-24">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8 mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-6 pb-3 border-b border-blue-200">
          Terms of Service
        </h1>
        
        <div className="space-y-6 text-blue-900">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">1. Acceptance of Terms</h2>
            <p className="mb-3">
              By accessing or using the Learning Management System ("LMS"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the service.
            </p>
            <p>
              The LMS services are provided by TrackAdemy, and may be updated or modified at any time without prior notice.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">2. User Accounts</h2>
            <p className="mb-3">
              To access certain features of the LMS, you may be required to create a user account. You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Providing accurate and complete information during registration</li>
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">3. Content and Intellectual Property</h2>
            <p className="mb-3">
              All content provided through the LMS, including but not limited to courses, videos, documents, and assessments, 
              is owned by TrackAdemy or its content partners and is protected by intellectual property laws.
            </p>
            <p className="mb-3">
              Users may not download, copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise 
              exploit any content for any purpose without the prior written consent of TrackAdemy.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">4. User Conduct</h2>
            <p className="mb-3">Users agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the LMS for any illegal purpose</li>
              <li>Post or transmit unauthorized commercial communications</li>
              <li>Upload viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to the LMS or other user accounts</li>
              <li>Interfere with or disrupt the proper functioning of the LMS</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">5. Payment and Subscriptions</h2>
            <p className="mb-3">
              Some courses or features may require payment. By subscribing to a paid service, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate billing information</li>
              <li>Pay all fees incurred through your account</li>
              <li>Acknowledge that subscriptions may automatically renew unless canceled</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">6. Termination</h2>
            <p className="mb-3">
              TrackAdemy reserves the right to suspend or terminate your account and access to the LMS at any time, 
              with or without cause, and with or without notice.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">7. Limitation of Liability</h2>
            <p className="mb-3">
              TrackAdemy shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your access to or use of, or inability to access or use, the LMS.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">8. Changes to Terms</h2>
            <p className="mb-3">
              TrackAdemy may modify these Terms of Service at any time. Continued use of the LMS after any changes 
              constitutes acceptance of the modified terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">9. Contact Information</h2>
            <p className="mb-3">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="font-medium text-blue-700">trackademy@gmail.com</p>
          </section>
        </div>
        
        <div className="mt-10 pt-6 border-t border-blue-200 flex justify-between">
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Back to Registration
          </Link>
          <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
