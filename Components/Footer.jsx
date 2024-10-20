import React from "react";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialInstagram,
} from "react-icons/ti";
import { IoCloudDownload } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    alert("Newsletter subscribed!");
  };

  return (
    <footer
      className="site-footer footer__ico pos-rel"
      data-background="assets/img/bg/footer_bg.png"
    >
      <div className="container">
        <div className="row mt-none-30">
          <div className="col-lg-4 mt-30">
            <div className="footer__widget footer_subscribe">
              <h2>Subscribe to our newsletter</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="raiayush8543@gmail.com"
                  required
                />
                <button type="submit">
                  <IoIosSend />
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-8 mt-30">
            <div className="footer_widget text-lg-end">
              <h2>Download Documents</h2>
              <div className="footer_document ul_li_right">
                {["White Paper", "One Paper", "Privacy Policy", "Terms of Sale"].map((title, index) => (
                  <a href="#" className="footer__document-item text-center" key={index}>
                    <div className="icon">
                      <img src="assets/img/icon/pdf.svg" alt={`${title} icon`} />
                    </div>
                    <span className="title">
                      <IoCloudDownload />
                      {title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer___bottom ul_li_between mt-50">
          <div className="footer_logo mt-20">
            <a href="#">
              <img src="assets/img/logo/logo.svg" alt="Company Logo" />
            </a>
          </div>

          <ul className="footer___social ul_li mt-20">
            <li>
              <a href="#">
                <TiSocialFacebook />
              </a>
            </li>
            <li>
              <a href="#">
                <TiSocialTwitter />
              </a>
            </li>
            <li>
              <a href="#">
                <TiSocialLinkedin />
              </a>
            </li>
            <li>
              <a href="#">
                <TiSocialInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer_copyright mt-35">
        <div className="container">
          <div className="footer_copyright-inner ul_li_between">
            <div className="footer_copyright-text mt-15">
              Copyright © 2024 All rights reserved
            </div>
            <ul className="footer__links ul_li_right mt-15">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer_icon-shape">
        <div className="icon icon--1">
          <img src="assets/img/shape/f_icon1.png" alt="Decorative shape 1" />
        </div>
        <div className="icon icon--2">
          <img src="assets/img/shape/f_icon2.png" alt="Decorative shape 2" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
