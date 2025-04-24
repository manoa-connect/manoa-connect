'use client';
 
import { Profile } from '@prisma/client';
import { Col, Container, Image, Row, Button, Card } from 'react-bootstrap';
import ClassList from './ClassList';
 
 const MatchCardBack = ({ profile, onFlipBack, }: { profile: Profile; onFlipBack: () => void; }) => {

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
            <Card.Subtitle className="mb-2 text-center">
            {profile.major}
            <br />
            {profile.year}
              </Card.Subtitle>
            <Row className="align-items-start">            
                <Col className="text-start" xs={4}>
                <ClassList label="Current Classes" classListString={profile.current} />
                <ClassList label="Previous Classes" classListString={profile.previous} />
            </Col>
            <Col className="text-start" xs={4}>
            <h3 className="text-start">Status: {profile.commute}</h3>
            <ClassList label="Clubs" classListString={profile.clubs} />
            <ClassList label="Languages" classListString={profile.languages} />

            </Col>
            <Col className="text-start" xs={4}>
            <h4 className="text-start">{profile.mbti}</h4>
            <ClassList label="Interests" classListString={profile.likes} />

            </Col>
            </Row>
          </Card.Body>
              <Button variant="primary" className="corner-button-card btn-sm" onClick={onFlipBack}>
                Back
                </Button>
        </Card>
        </Container>
  );
};

export default MatchCardBack;