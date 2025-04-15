'use client';
 
 import { Col, Container, Image, Row, Button, Card } from 'react-bootstrap';
 
 const SettingsPage = () => (
    <Container fluid className="card-page-container">

      <Container className="center-card">
            <Row className="align-items-center">
                <Col xs="auto">
                    <Image
                        src="https://media.discordapp.net/attachments/1359756631692415118/1359783965346762823/manoa-connect_logo_light.png?ex=67fd5a40&is=67fc08c0&hm=f6bdefb19cf618524461fd1827769284146442e63342cdfee3a3f0d81f201b27&=&format=webp&quality=lossless&width=986&height=986"
                        alt="Top left"
                        className="top-left-image"
                    />
                </Col>
                <Col lg={10}>
                    <h2 className="text-start">Settings</h2>
                </Col>
            </Row>
            <Row className="justify-content-start">
              <Col lg={1} className="text-start">
                </Col>
                <Col lg={1} className="text-start">
                  <h3>Filters</h3>
            </Col>
            <Col lg={9} className="text-start">
                <Card className="card">
                    <Card.Body>
                        <Card.Title className="text-muted">Default: Everyone</Card.Title>
                        <Row>
                        <Card.Title>Filter by</Card.Title>
                          <Col lg={4} className="text-center">
                        <Card.Title>Preferred</Card.Title>
                        <Card.Text>
                            <ul className="list-unstyled text-start">
                                <li>Major: Computer Science, Film, Theater <Button className="btn-sm">Edit</Button> </li>
                                <li>Interests: Marvel, Anime <Button className="btn-sm">Edit</Button></li>
                                <li>Clubs: Panda, GreyHats <Button className="btn-sm">Edit</Button></li>
                                <li>Location: 20 miles <Button className="btn-sm">Edit</Button></li>
                            </ul>
                        </Card.Text>
                        </Col>
                        <Col lg={4} className="text-center">
                        <Card.Title>Least Preferred</Card.Title>
                        <Card.Text>
                            <ul className="list-unstyled text-start">
                                <li>Major: Accounting <Button className="btn-sm">Edit</Button> </li>
                                <li>Interests: None <Button className="btn-sm">Edit</Button></li>
                                <li>Clubs: Accounting <Button className="btn-sm">Edit</Button></li>
                                <li>Location: None <Button className="btn-sm">Edit</Button></li>
                            </ul>
                        </Card.Text>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
                <Button variant="primary" className="corner-button-card btn-sm">
                Back
                </Button>
        </Container>
    </Container>
 );
 
 export default SettingsPage;