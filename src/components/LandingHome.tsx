'use client';

import { Col, Container, Row, Button } from 'react-bootstrap';

const LandingHome = () => (
    <Container className="bg-light" fluid>
        <Row className="align-items-center justify-content-center v-middle">
            <Col s={1} />
            <Col xs={3} />            <Col className="justify-content-center align-middle text-center">
                <h3 className='py-2 ps-4'>TODO: Add icons and allat</h3>
                <Button className="btn-success my-1 py-2 px-5">Temporary</Button>
            </Col>
            <Col s={1} />
        </Row>
    </Container>
);

export default LandingHome;
