import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  RiTwitterLine,
  RiLinkedinBoxLine,
  RiGithubLine,
  RiGlobalLine,
} from "react-icons/ri";
import {useAuthContext} from "../context/AuthContext";
function About() {
  const { setUser } = useAuthContext();
  const team = [
    {
      name: "John Appleseed",
      pic: "background.png",
      position: "Priciple Investigator",
      contacts: { website: "#", twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "John Appleseed",
      pic: "",
      position: "Priciple Investigator",
      contacts: { website: "#", twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "John Appleseed",
      pic: "",
      position: "Priciple Investigator",
      contacts: { website: "#", twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "John Appleseed",
      pic: "",
      position: "Priciple Investigator",
      contacts: { website: "#", twitter: "#", linkedin: "#", github: "#" },
    },
    {
      name: "John Appleseed",
      pic: "",
      position: "Priciple Investigator",
      contacts: { website: "#", twitter: "#", linkedin: "#", github: "#" },
    },
  ];
  return (
    <div className="about">
      <div className="intro">
        <div className="logo">
          <span>OASIS</span>
          <img alt="radxrad-logo" src="radxrad-logo.svg" />
        </div>
        <div className="body">
          Oasis is a place to connect with other researchers and share rapid
          science through micropubs, a new way to rapidly share emerging science
          for single, validated results that include novel findings, negative
          and/or reproduced results, new methods, standards, common data
          elements or procedures.
        </div>
      </div>
      <div className="team">
        <h3>Our Team</h3>
        <Row xs={1} md={3} className="g-4">
          {team.map((member, index) => (
            <Col>
              <Card id={"card-" + index} className="mp-list">
                <Card.Img variant="top" src={member.pic} alt="team-avatar" />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Text> {member.position}</Card.Text>
                  <div className="contacts">
                    {member.contacts.website ? (
                      <a className="icon-btn" href={member.contacts.website}>
                        <RiGlobalLine />
                      </a>
                    ) : (
                      ""
                    )}
                    {member.contacts.twitter ? (
                      <a className="icon-btn" href={member.contacts.twitter}>
                        <RiTwitterLine />
                      </a>
                    ) : (
                      ""
                    )}
                    {member.contacts.linkedin ? (
                      <a className="icon-btn" href={member.contacts.linkedin}>
                        <RiLinkedinBoxLine />
                      </a>
                    ) : (
                      ""
                    )}
                    {member.contacts.github ? (
                      <a className="icon-btn" href={member.contacts.github}>
                        <RiGithubLine />
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default About;
