'use client';

import { Col, Container, Image, Row, Button, Card, Navbar, Nav } from 'react-bootstrap';
import text_logo from '../../public/assets/manoa-connect_logo-text.svg'
import card_image from '../../public/img/hero-img.jpg';

const HeroSec = () => (
    <Container id="hero" fluid>
        <Row className="align-items-center justify-content-center v-middle">
            <Col s={1} />
            <Col xs={3}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={card_image.src} />
                    <Card.Body>
                    <Card.Title>Placeholder Card</Card.Title>
                    <Card.Text>
                        This will be some card once the connect/match page has been fleshed out.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="justify-content-center align-middle text-center">
                <Image src={text_logo.src} width="650px" alt="Manoa Connect" className="invert mt-5"/>
                <h3 className='py-2 ps-4 text-light'>Connecting made easy.</h3>
                <Button className="btn-success my-1 py-2 px-5" href="/auth/signup">Get Started</Button>
                <Navbar className="justify-content-center align-middle text-center text-light">
                    <Navbar.Text className="text-light me-2">Already have an account?</Navbar.Text>
                    <Nav.Link className="hover-line" href="/auth/signin">Sign in</Nav.Link>
                </Navbar>
            </Col>
            <Col s={1} />
        </Row>
    </Container>
);

export default HeroSec;
