import React from "react";
import paths from "paths";

function Footer() {
  return (
    <div className="footer">
      <div className="logo">
        <span>OASIS</span>
        <img alt="radxrad-logo" src="radxrad-logo.svg" />
      </div>
      <a href={paths.about}>About</a>
      <a href="/">Contact Us</a>
      <a href="/">Terms of Use</a>
      <a href="/">Privacy Policy</a>
      <div className="seperator"></div>
      <div>@2021 OASIS</div>
    </div>
  );
}

export default Footer;
