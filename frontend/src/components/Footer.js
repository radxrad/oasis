import React from "react";
import paths from "paths";
import ListGroup from 'react-bootstrap/ListGroup';

function Footer() {
  return (
    <div className="footer">

      <div className="logo">
        <span>OASIS</span>
        <img alt="radxrad-logo" src="radxrad-logo.svg" />
      </div>
            <ListGroup horizontal>
                <ListGroup.Item>
                    <a href={paths.about}>About</a></ListGroup.Item>
                 <ListGroup.Item><a href="/">Contact Us</a></ListGroup.Item>
                 <ListGroup.Item><a href="/">Terms of Use</a></ListGroup.Item>
                 <ListGroup.Item><a href="/">Privacy Policy</a></ListGroup.Item>
            </ListGroup >
        <div className="seperator"></div>
                              <div>@2022 OASIS</div>

    </div>
  );
}

export default Footer;
