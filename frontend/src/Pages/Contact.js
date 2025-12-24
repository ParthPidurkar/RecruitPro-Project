import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-primary fw-bold mb-4">We’d Love to Hear from You</h2>
        <p className="text-muted fs-5 mb-4">
          Whether you have questions about our platform, need technical assistance, or want to explore a partnership—our team is here to help.
          Reach out using the form below or email us directly at <strong>support@recruitpro.com</strong>.
        </p>

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" placeholder="Name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input type="text" className="form-control" id="subject" placeholder="Partnership / Support / Query..." required />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea className="form-control" id="message" rows="5" placeholder="Type your message here..." required></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>

        <div className="mt-5 text-muted">
          📍 Head Office: RecruitPro Pvt. Ltd., 5th Floor, Business Tower, Bengaluru, India  
          <br />
          ☎️ Phone: +91-95185-59175
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
