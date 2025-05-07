/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import { Profile } from '@prisma/client';
import { useState, useEffect } from 'react';
import { loadImg } from '@/lib/supabase/storage/client';
import { Col, Container, Image, Card, Button, Navbar, Modal } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import logo from '../../public/assets/manoa-connect_logo.svg';
import defaultPic from '../../public/img/deafultProf.png';

const MatchCard = ({ profile, onFlip }: { profile: Profile; onFlip: () => void; }) => {
  const [currImgs, setCurrImgs] = useState<string[]>([]);
  const [currPic, setCurrPic] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const { images, error } = await loadImg('manoa-connect-pics', profile.id.toString());

      if (error) {
        console.error(error);
      } else {
        setCurrImgs(images || []);
      }
    };

    const fetchProfPic = async () => {
      const { images, error } = await loadImg('manoa-connect-pics', `${profile.id.toString()}-profile`);

      if (error) {
        console.error(error);
      } else {
        setCurrPic(images || []);
      }
    };

    fetchImages();
    fetchProfPic();
  }, [profile.id]);

  const handleClose = () => {
    setShow(false);
    setSelectedImg(null);
  };

  const handleShow = (url: string) => {
    setSelectedImg(url);
    setShow(true);
  };

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
            <Icon.PersonVcard className="text-light" size="25px" />
            <Col className="m-0 p-0">
              <Navbar.Text className="text-light ms-2">
                <strong>University of Hawaiʻi </strong>
                |
                {` ${profile.firstName} ${profile.lastName}`}
              </Navbar.Text>
            </Col>
            <Col className="m-0 p-0 justify-content-end d-flex">
              <Image src={logo.src} alt="" className="invert m-0 mb-1 p-0" width="30px" />
            </Col>
          </Navbar>
        </Card.Header>
        <Card.Body className="card-body d-flex pb-5">
          <Col className="ms-3 me-2">
            {currPic.length === 1 ? (currPic.map((url) => (
              <Card.Img
                src={url}
                key={url}
                className="rounded-circle mt-4 mx-auto justify-content-start"
                style={{ width: '225px', height: '225px', objectFit: 'cover', maxHeight: '225px' }}
              />
            ))
            ) : (
              <Card.Img
                src={defaultPic.src}
                className="rounded-circle mt-4 mx-auto justify-content-start"
                style={{ width: '225px', height: 'auto', objectFit: 'cover', maxHeight: '225px' }}
              />
            )}
            <p className="p-0 m-0 mt-3 text-secondary text-center">
              {profile.email}
            </p>
            <hr className="mx-4 my-3 d-flex align-middle justify-self-center text-center" />
            <p className="mb-4 mt-1 text-center" style={{ fontStyle: 'italic' }}>
              {profile.description}
            </p>
          </Col>
          <Col lg={10} className="mt-1 ms-4 pt-4">
            <h1 className="text-heavitas p-0 m-0" style={{ fontSize: '55px' }}>
              {`${profile.firstName} ${profile.lastName}`}
            </h1>
            <p className="text-dark mb-2" style={{ fontSize: '1.1rem' }}>
              <Icon.Mortarboard className="me-2 mb-1" size="25px" />
              {`${profile.year}`}
              <span className="mx-1"> | </span>
              <Icon.SuitcaseLg className="ms-1 me-2 mb-1" size="25px" />
              {profile.major}
              <span className="mx-1"> | </span>
              <Icon.Person className="ms-1 me-2" size="25px" />
              {profile.mbti}
            </p>
            <hr className="w-75 border-1" />
            {currImgs.length >= 3 ? (
              currImgs.slice(0, 3).map((url, index) => (
                <Image
                  className="mx-2 hover-line"
                  style={{ width: '200px', objectFit: 'cover', maxHeight: '200px', verticalAlign: 'top' }}
                  key={url}
                  src={url}
                  alt={`img-${index}`}
                  onClick={() => handleShow(url)}
                  rounded
                />
              ))
            ) : (
              currImgs.length !== 0 ? (
                currImgs.map((url, index) => (
                  <Image
                    className="mx-2 hover-line"
                    style={{ width: '200px', objectFit: 'cover', maxHeight: '200px', verticalAlign: 'top' }}
                    key={url}
                    src={url}
                    alt={`img-${index}`}
                    onClick={() => handleShow(url)}
                    rounded
                  />
                ))
              ) : (
                <></>
              )
            )}
          </Col>

        </Card.Body>
        <Card.Footer className="m-0 p-0 d-flex border-0 py-2 justify-content-end">
          <Button
            variant="success"
            style={{ backgroundColor: 'var(--manoa-green)' }}
            className="border-0 me-4"
            onClick={onFlip}
          >
            More
            <Icon.ArrowRight className="ms-1 mb-1 text-light" size="15px" />
          </Button>
        </Card.Footer>
      </Card>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header className="justify-content-end">
          <a className="link-success me-2 text-end hover-line" onClick={handleClose}>
            <Icon.ArrowLeft className="link-success hover-line me-2" />
            Back
          </a>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {selectedImg && (
            <Image
              src={selectedImg}
              alt="Selected"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MatchCard;
