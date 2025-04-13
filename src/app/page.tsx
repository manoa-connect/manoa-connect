'use client';

import { Col, Container, Image, Row } from 'react-bootstrap';
import HeroSec from '@/components/HeroSec';

/** The Home page. */
const Home = () => (
  <main>
    <HeroSec />
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={4}>
          <Image src="next.svg" width="175px" alt="" />
        </Col>

        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Welcome to this template</h1>
          <p>Now get to work and modify this app!</p>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
