import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <div className="logo-icon"></div>
              <span>SimoraAi</span>
            </div>
            <p>The ultimate AI-powered video captioning platform that helps you make your content accessible and engaging for everyone.</p>
          </div>
          
          <div className="footer-col">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Testimonia</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>HELP</h4>
            <ul>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Delivery Details</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-col newsletter">
            <h4>NEWSLETTER</h4>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit" className="btn btn-primary">Subscribe Now</button>
            </form>
          </div>
        </div>
        <div className="copyright">
          © Copyright 2026. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
