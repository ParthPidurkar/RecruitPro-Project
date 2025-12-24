import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const FAQs = () => {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-primary fw-bold mb-4">Frequently Asked Questions</h2>

        <div className="accordion" id="faqAccordion">
          {/* Question 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                How does RecruitPro help employers?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                RecruitPro offers employers an all-in-one recruitment solution that simplifies the entire hiring lifecycle. You can:
                <ul className="mt-2">
                  <li> Post jobs that instantly reach a large pool of qualified candidates.</li>
                  <li> Use smart filters and AI-powered matching to shortlist the most relevant applicants.</li>
                  <li> Schedule interviews and communicate with candidates within the platform.</li>
                  <li> Track job performance and time-to-hire with real-time analytics.</li>
                </ul>
                Whether you're hiring one role or building an entire team, RecruitPro adapts to your workflow and scales with your business.
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Is RecruitPro free for job seekers?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Yes! RecruitPro is completely free for all job seekers. Once you register:
                <ul className="mt-2">
                  <li> You can build a professional profile highlighting your skills and experience.</li>
                  <li> Apply to an unlimited number of job postings across industries.</li>
                  <li> Receive personalized job recommendations based on your interests.</li>
                  <li> Track the status of your applications and communicate directly with recruiters.</li>
                </ul>
                There are no hidden charges, subscription fees, or paywalls.
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Can I schedule interviews through RecruitPro?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Absolutely. RecruitPro allows employers to schedule interviews with candidates seamlessly using our built-in calendar integration. Here's what you can do:
                <ul className="mt-2">
                  <li> Select preferred time slots and send invites directly to candidates.</li>
                  <li> Receive confirmations and track attendance from your dashboard.</li>
                  <li> Add custom instructions, attach documents, and set reminders.</li>
                </ul>
                For job seekers, the interview details will be reflected in their portal, along with email notifications and a timeline view of upcoming interviews.
              </div>
            </div>
          </div>

          {/* Question 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                What if I forget my login credentials?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Don't worry! We've made account recovery easy:
                <ul className="mt-2">
                  <li> On the login screen, click <strong>"Forgot Password"</strong>.</li>
                  <li> Enter your registered email address.</li>
                  <li> You’ll receive a reset link via email within a few seconds.</li>
                  <li> Click the link and set a new password of your choice.</li>
                </ul>
                If you do not receive the reset email within a few minutes, check your spam folder or contact our support at <strong>support@recruitpro.com</strong>.
              </div>
            </div>
          </div>

          {/* Question 5 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                How secure is my data on RecruitPro?
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                Data privacy and security are a top priority at RecruitPro. We implement the following measures:
                <ul className="mt-2">
                  <li> End-to-end encryption for data storage and communication.</li>
                  <li> Secure login with password hashing and multi-factor authentication (optional).</li>
                  <li> GDPR-compliant user data policies, giving users full control over their data.</li>
                  <li> Regular security audits and monitoring for any suspicious activity.</li>
                </ul>
                Your information will never be sold or shared without your consent.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
