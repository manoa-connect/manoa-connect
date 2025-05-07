/* eslint-disable @next/next/no-async-client-component */

'use client';

import { Profile } from '@prisma/client';
import { Col, Container, Image, Row, Button, Card, Navbar } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import ClassList from './ClassList';
import logo from '../../public/assets/manoa-connect_logo.svg';

type Class = {
  id: number;
  name: string;
};

type ProfileWithClasses = Profile & {
  classes: Class[];
};

const MatchCardBack = ({ profile, onFlipBack }: { profile: ProfileWithClasses; onFlipBack: () => void; }) => {
  const classString = profile.classes.map((cls) => cls.name).join(', ') || 'No classes available';

  return (
    <Container
      id="bg-image"
      className="card-page-container py-5 justify-content-center"
      style={{ height: '87vh' }}
      fluid
    >
      <Card className="center-card border-0 mb-5">
        <Card.Header style={{ backgroundColor: 'var(--manoa-green)' }}>
          <Navbar className="m-0 p-0 d-flex">
            <Image src={logo.src} alt="" className="invert m-0 mb-1 p-0" width="30px" />
            <Col className="m-0 p-0" />
            <Col className="m-0 p-0 text-end">
              <Navbar.Text className="text-light ms-2 me-2">
                <strong>University of Hawaiʻi </strong>
                |
                {` ${profile.firstName} ${profile.lastName}`}
              </Navbar.Text>
            </Col>
            <Icon.PersonVcard className="text-light" size="25px" />
          </Navbar>
        </Card.Header>
        <Card.Body className="card-body d-block pb-5 align-middle">
          <Row className="align-items-center align-middle mt-4">
            <Col className="justify-content-center">
              <h1 className="text-heavitas p-0 m-0 text-center">
                {`${profile.firstName} ${profile.lastName}`}
              </h1>
              <p className="text-dark text-center mb-0" style={{ fontSize: '1.1rem' }}>
                <Icon.Mortarboard className="me-2 mb-1" size="25px" />
                {`${profile.year}`}
                <span className="mx-1"> | </span>
                <Icon.SuitcaseLg className="ms-1 me-2 mb-1" size="25px" />
                {profile.major}
                <span className="mx-1"> | </span>
                <Icon.Person className="ms-1 me-2 mb-1" size="25px" />
                {profile.mbti}
              </p>
              <p className="text-center p-0 m-0 mt-1 text-secondary">{profile.email}</p>
              <hr className="text-center align-middle d-block justify-self-center" />
            </Col>
          </Row>
          <Row className="align-middle px-4 mt-1">
            <Col>
              <strong className="mt-2" style={{ fontSize: '1.3rem' }}>
                <Icon.PersonFill className="mb-1 me-1" size="20px" />
                About Me
              </strong>
              <br />
              <p className="mb-4" style={{ fontStyle: 'italic' }}>
                {profile.description}
              </p>
              <hr className="w-75 justify-content-center mx-1" />
              <p className="mb-4 mt-2">
                <strong style={{ fontSize: '1.3rem' }}>
                  <Icon.PatchCheckFill className="mb-1 me-1" size="20px" />
                  Interests
                </strong>
                <br />
                {profile.likes}
              </p>
            </Col>
            <Col>
              <p>
                <strong style={{ fontSize: '1.3rem' }} className="text-center me-2">
                  <Icon.BusFront className="mb-1 me-1" size="20px" />
                  Commute Status
                </strong>
                <span className="text-secondary">{profile.commute}</span>
              </p>
              <hr />
              <p>
                <strong style={{ fontSize: '1.3rem' }} className="text-center me-2">
                  <Icon.PersonArmsUp className="mb-1 me-1" size="20px" />
                  Clubs
                </strong>
                <span className="text-secondary">{profile.clubs}</span>
              </p>
              <hr />
              <p>
                <strong style={{ fontSize: '1.3rem' }} className="text-center me-2">
                  <Icon.GlobeAmericas className="mb-1 me-1" size="20px" />
                  Languages
                </strong>
                <span className="text-secondary">{profile.languages}</span>
              </p>
            </Col>
            <Col className="justify-content-center align-middle text-center">
              <Row className="px-5">
                <strong
                  className="text-center d-block align-middle justify-content-center mb-2"
                  style={{ fontSize: '1.3rem' }}
                >
                  <Icon.BookmarkFill className="mb-1 me-1" size="18px" />
                  Courses
                </strong>
                <br />
              </Row>
              <Row className="d-flex justify-content-center">
                <Col className="ms-4">
                  <strong>
                    Previous
                  </strong>
                  <ClassList classListString={profile.previous} />
                </Col>
                <Col className="me-4">
                  <strong>
                    Current
                  </strong>
                  <ClassList classListString={classString} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="m-0 p-0 border-0 py-2">
          <Navbar className="m-0 p-0 d-flex">
            <Col className="m-0 p-0 ms-3">
              <Icon.Instagram size="25px" className="mx-2" style={{ color: 'var(--manoa-green)' }} />
              <Icon.TwitterX size="25px" className="mx-2" style={{ color: 'var(--manoa-green)' }} />
              <Icon.Tiktok size="25px" className="mx-2" style={{ color: 'var(--manoa-green)' }} />
              <Icon.Snapchat size="25px" className="mx-2" style={{ color: 'var(--manoa-green)' }} />
            </Col>
            <Col className="m-0 p-0 justify-content-end d-flex">
              <Button
                variant="success"
                style={{ backgroundColor: 'var(--manoa-green)' }}
                className="border-0 me-4"
                onClick={onFlipBack}
              >
                Back
                <Icon.ArrowLeft className="ms-1 mb-1 text-light" size="15px" />
              </Button>
            </Col>
          </Navbar>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default MatchCardBack;
