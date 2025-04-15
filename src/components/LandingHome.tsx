'use client';

import { Col, Container, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const LandingHome = () => (
    <Container className="bg-white pb-4" fluid>
        <Container fluid="md">
            <Row className="align-items-center justify-content-center v-middle text-center">
                <Col className="slide-up">
                    <Icon.Calendar2Check size={100} className="m-4" style={{color: "var(--manoa-green)"}} />
                    <h1 className="text-heavitas">Match Your Schedules</h1>
                    <p>
                    Connect with users who have similar schedules and free periods. This way, you don&apos;t 
                    have to worry about finding a time to meet on campus!
                    </p>
                </Col>

                <Col className="slide-up">
                    <Icon.GeoAlt size={100} className="m-4" style={{color: "var(--manoa-green)"}}/>
                    <h1 className="text-heavitas">Check on Campus</h1>
                    <p>
                    Based on the classes you are taking, Manoa Connect finds other students near the area, 
                    or on the way in between classes for you to catch up with. 
                    </p>
                </Col>

                <Col className="slide-up">
                    <Icon.PersonVcard size={100} className="m-4" style={{color: "var(--manoa-green)"}} />
                    <h1 className="text-heavitas">Connect Students</h1>
                    <p>
                    After creating your profile, check the connect page to skip/connect wtih students outside 
                    of your classes and major to meet new people!
                    </p>
                </Col>

                <Col className="slide-up">
                    <Icon.ChatDots size={100} className="m-4" style={{color: "var(--manoa-green)"}} />
                    <h1 className="text-heavitas">Chat with Friends</h1>
                    <p>
                    Use the Manoa Connect friends list to track your friends and mark your favorites. Keep in touch
                    and grow your friendship with the chat page!
                    </p>
                </Col>
            </Row>
        </Container>
    </Container>
);

export default LandingHome;
