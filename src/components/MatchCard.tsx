'use client';

import { Profile } from '@prisma/client';
import { Col, Container, Image, Row, Card } from 'react-bootstrap';
 
 const MatchCard = ({ profile, onFlip, }: { profile: Profile; onFlip: () => void; }) => {

  return (
    <Container fluid className="card-page-container">
          <Card className="center-card">
          <Card.Body className="card-body">
            <Row className="align-items-center">
                <Col xs="auto">
                    <Image
                        src="/manoa-connect_logo_light.png"
                        alt="Top left"
                        className="top-left-image"
                    />
                </Col>
                <Col lg={10}>
                    <Card.Title className="text-center">
                    {profile.firstName} 
                    &nbsp;
                    {profile.lastName}
                    </Card.Title>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={4} className="text-center">
                    {/*<Image src={profile.image1} />*/}
                    <Image
                        className="card-image py-2"
                        src="image1.png"
                        alt="Profile Picture1"
                    />
            </Col>
            <Col lg={4} className="text-center">
            {/*<Image src={profile.image2} />*/}
            <Image
              className="card-image py-2"
              src="image.png"
              alt="Profile Picture2"
            />
            </Col>
            <Col lg={4} className="text-center">
            {/*<Image src={profile.image3} />*/}
            <Image
              className="card-image py-2"
              src="image3.png"
              alt="Profile Picture3"
            />
            </Col>
            </Row>
            <Card.Subtitle className="mb-2 text-center">
              {profile.major},
              &nbsp;
              {profile.year}
            </Card.Subtitle>
            <Card.Text className="text-center">
              {profile.description}
            </Card.Text>
          </Card.Body>
            <Button variant="primary" className="corner-button-card btn-sm" onClick={onFlip}>
                View Profile
            </Button>
          </Card>
        </Container>
  );
};

export default MatchCard;