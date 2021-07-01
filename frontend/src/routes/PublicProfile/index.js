import React from "react";
import { Button, Col, ListGroup, Row, Container, Card } from "react-bootstrap";

export default function PublicProfile() {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <h3>Your Feed </h3>
            <Button>Share Your Research</Button>
          </Row>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header as="h5">Featured</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Row>
            <h1>Stories near you</h1>
            <Button>Ask a Question </Button>
          </Row>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
