import React from 'react';

export function PrivacyPolicyView() {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center border-b border-warm-border pb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-dark tracking-tight">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-muted font-bold uppercase tracking-wider">Last Revised: July 17, 2026</p>
        </div>

        <div className="space-y-6 text-muted text-sm sm:text-base leading-relaxed font-semibold">
          <p>
            At B2bfiy ("we", "our", or "Agency"), your privacy is of utmost importance to us. This Privacy Policy is designed to help you understand how we collect, use, and safeguard your personal and business information.
          </p>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-dark">1. What Information Do We Collect?</h3>
            <p>
              When you submit a request for a free digital presence audit or contact us through our website forms, we collect the personal information you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your full name</li>
              <li>Business name and goals</li>
              <li>Email address and WhatsApp phone number</li>
              <li>Website or social media page URLs</li>
              <li>Any message content or special instructions sent via our forms</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-dark">2. How Do We Use Your Information?</h3>
            <p>
              The information we collect is utilized strictly for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To evaluate your digital presence and prepare your free digital audit report PDF</li>
              <li>To communicate with you via WhatsApp or Email regarding your request</li>
              <li>To improve our digital services, web experiences, and customer support</li>
              <li>To deliver relevant agency updates, proposals, or custom project quotations</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-dark">3. Data Security and Confidentiality</h3>
            <p>
              We prioritize the safety of your business assets and personal data. B2bfiy will never sell, trade, rent, lease, or transfer your contact info or business statistics to any third-party marketing companies.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-dark">4. Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our support team directly via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TermsView() {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center border-b border-warm-border pb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-dark tracking-tight">Terms of Use</h1>
          <p className="text-xs sm:text-sm text-muted font-bold uppercase tracking-wider">Last Revised: July 17, 2026</p>
        </div>

        <div className="space-y-6 text-muted text-sm sm:text-base leading-relaxed font-semibold">
          <p>
            By accessing B2bfiy's website and utilizing our digital agency services, you agree to be legally bound by the following Terms of Use. Please review them carefully.
          </p>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-dark">1. Scope of Service & Bookings</h3>
            <p>
              B2bfiy offers customized website development, professional graphic design, social media content management, and video editing services. Before a project initiates, the scope of work and quotation must be mutually agreed upon, and initial retainer payments must be completed according to the contract parameters.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-dark">2. Delivery and Revision Policy</h3>
            <p>
              We are dedicated to meeting quality standards and agreed delivery schedules. Upon project submission, the client is entitled to submit feedback and request revisions within the limits defined in their chosen package or custom agreement.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-dark">3. Intellectual Property and Copyrights</h3>
            <p>
              Once all outstanding invoices and project balances are paid in full, 100% intellectual property ownership and copyright of the custom deliverables (source files, code, design graphics, edited reels) belong to the client. B2bfiy retains the right to display project screenshots, case study reviews, and design mockups in our agency portfolio and promotional channels unless explicitly requested otherwise by the client in writing.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-lg text-dark">4. Refund Policy</h3>
            <p>
              Upfront retainer payments or payments made once active development/design execution has commenced are non-refundable. Any adjustments or cancellations will be handled on a case-by-case basis through amicable communication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
