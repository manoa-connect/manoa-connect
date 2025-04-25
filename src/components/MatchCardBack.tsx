'use client';
 
import { Profile } from '@prisma/client';
import { Col, Container, Image, Row, Card } from 'react-bootstrap';
import OldClassList from './OldClasses';
import ClassList from './ClassList';
 
 const MatchCardBack = ({ profile}: { profile: Profile }) => {

  return (
    <Container fluid className="card-page-container">
      <Card className="center-card">
          <Card.Body className="card-body">
            <Row className="align-items-center">
                <Col xs="auto">
                    <Image
                        src="https://media.discordapp.net/attachments/1359756631692415118/1359783965346762823/manoa-connect_logo_light.png?ex=67fd5a40&is=67fc08c0&hm=f6bdefb19cf618524461fd1827769284146442e63342cdfee3a3f0d81f201b27&=&format=webp&quality=lossless&width=986&height=986"
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
            {profile.major},&nbsp;{profile.year}
              </Card.Subtitle>
            <Row className="align-items-start">            
                <Col className="text-start" xs={4}>
                <h3 className="text-start">Current Classes</h3>
                <ul className="list-unstyled text-start">
                    <li>{profile.current}</li>
                </ul>
                <h4 className="text-start">Old Classes</h4>
                <OldClassList profile={profile}/>
                <ClassList label="Previous Classes" classListString={profile.previous} />
                <ClassList label="Current Classes" classListString={profile.current} />   
            </Col>
            <Col className="text-start" xs={4}>
            <h3 className="text-start">Status: {profile.commute}</h3>
                <h3 className="text-start">Clubs</h3>
                <ul className="list-unstyled text-start">
                    <li>Panda</li>
                    <li>GreyHat Hackers</li>
                </ul>
                <h3 className="text-start">Languages</h3>
                <ul className="list-unstyled text-start">
                    <li>English</li>
                    <li>Hawaiian</li>
                </ul>
            </Col>
            <Col className="text-start" xs={4}>
            <h4 className="text-start">{profile.mbti}</h4>
                <h3 className="text-start">Interests</h3>
                <ul className="list-unstyled text-start">
                    <li>Gaming</li>
                    <li>Programming</li>
                    <li>Music</li>
                    <li>Cooking</li>
                  </ul>
            </Col>
            </Row>
          </Card.Body>
               {/*} <Button variant="primary" className="corner-button-card btn-sm" onClick={onFlipBack}>
                Back
                </Button> */}
        </Card>
        </Container>
  );
};

export default MatchCardBack;