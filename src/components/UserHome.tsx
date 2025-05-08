/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-await-in-loop */

'use client';

import { Col, Container, Row, Card, Button, Nav, Modal, Image, ListGroup } from 'react-bootstrap';
import { useRef, ChangeEvent, useState, useEffect, useTransition } from 'react';
import { Profile, Chat, Class } from '@prisma/client';
import { uploadProfImg, loadImg } from '@/lib/supabase/storage/client';
import locationLabels from '@/lib/locationMappings';
import * as Icon from 'react-bootstrap-icons';
import defaultPic from '../../public/img/deafultProf.png';

type ProfileWithMatches = Profile & {
  matches: Profile[];
};

const UserHome = ({ profile, chatList, classData }:
{ profile: ProfileWithMatches; chatList: Chat[], classData: Class[] }) => {
  const [currImgs, setCurrImgs] = useState<string[]>([]);
  const [currPic, setCurrPic] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [photoShow, setPhotoShow] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handlePhotoClose = () => {
    setPhotoShow(false);
    setSelectedImg(null);
  };

  const handlePhotoShow = (url: string) => {
    setSelectedImg(url);
    setPhotoShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setImgURLs([]);
  };
  const handleShow = () => setShow(true);

  async function convertBlobUrlToFile(blobUrl: string) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const fileName = Math.random().toString(36).slice(2, 9);
    const mimeType = blob.type || 'application/octet-stream';
    const file = new File([blob], `${fileName}.${mimeType.split('/')[1]}`, {
      type: mimeType,
    });
    return file;
  }

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

  const handleClickUpload = () => {
    const fetchProfPic = async () => {
      const { images, error } = await loadImg('manoa-connect-pics', `${profile.id.toString()}-profile`);

      if (error) {
        console.error(error);
      } else {
        setCurrPic(images || []);
      }
    };

    startTransition(async () => {
      const URLs: (string | undefined)[] = [];
      for (const url of imgURLs) {
        const imgFile = await convertBlobUrlToFile(url);

        const { imgURL, error } = await uploadProfImg({
          file: imgFile,
          bucket: 'manoa-connect-pics',
          folder: `${profile.id.toString()}-profile`,
        });

        if (error) {
          console.error(error);
          return;
        }

        URLs.push(imgURL);
      }

      console.log(URLs);
      setImgURLs([]);
      setCurrPic(URLs.filter((url): url is string => url !== undefined));
      await fetchProfPic();
    });

    handleClose();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImgURLs = filesArray.map((file) => URL.createObjectURL(file));

      setImgURLs([...imgURLs, ...newImgURLs]);
    }
  };

  function countUnreadMessages(chatList: Chat[] | undefined, currentUserId: number, currentUserEmail: string): number {
    if (!chatList) return 0;
    return chatList.filter(
      chat => chat.contactId === currentUserId && chat.owner !== currentUserEmail && !chat.isRead,
    ).length;
  }

  function countMatches(profile: ProfileWithMatches): number {
    return profile.matches.length;
  }

  const unreadCount = countUnreadMessages(chatList, profile.id, profile.email);
  const matchCount = countMatches(profile);

  /* TODO(?): Maybe we could add a feature where the user can customize the colors of their profile */
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { profile ? (
        <Container id="bg-image" className="justify-content-center" fluid>
          <Container className="d-flex mx-5">
            <Col sm={4} className="bg-white py-5 px-5 me-2">
              {currPic.length === 1 ? (currPic.map((url) => (
                <Card.Img
                  src={url}
                  key={url}
                  className="bg-secondary rounded-circle d-block mt-5 mx-auto"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', maxHeight: '150px' }}
                />
              ))
              ) : (
                <Card.Img
                  src={defaultPic.src}
                  className="bg-secondary rounded-circle d-block mt-5 mx-auto"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', maxHeight: '150px' }}
                />
              )}
              <h1 className="text-center pt-4 text-heavitas">
                {profile.firstName}
                {' '}
                {profile.lastName}
              </h1>
              <p className="text-center text-secondary">
                {`${profile.year} | ${profile.major} Major`}
              </p>
              <hr className="w-75 mx-auto d-block" />
              <p className="pb-1 text-center">
                {profile.description}
              </p>
              <hr className="w-75 mx-auto d-block" />
              <p className="pt-1 pb-5 text-center">
                <strong>Likes:</strong>
                {' '}
                {profile.likes}
              </p>
              <Button
                variant="outline-success"
                className="mt-5 mb-2 py-2 px-4 mx-auto d-block w-100"
                href="/editProfile"
              >
                <Icon.PencilSquare />
                {' '}
                Edit Profile
              </Button>
              <Button
                className="btn-success mb-5 mt-2 py-2 px-4 mx-auto d-block w-100"
                onClick={handleShow}
              >
                <Icon.PersonCircle />
                {' '}
                Change Photo
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-heavitas">Change Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row className="px-5 pb-1">
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      ref={imgInputRef}
                      onChange={handleImageChange}
                      disabled={isPending}
                    />

                    <Button
                      onClick={() => imgInputRef.current?.click()}
                      disabled={isPending}
                      variant="outline-success"
                    >
                      Select Image
                    </Button>

                    <Container className="d-flex pb-5 justify-content-center">
                      {imgURLs.map((url, index) => (
                        <Image
                          key={url}
                          src={url}
                          width={350}
                          alt={`img-${index}`}
                          style={{ width: '150px', height: 'auto', objectFit: 'cover', maxHeight: '150px' }}
                        />
                      ))}
                    </Container>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Discard Changes
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleClickUpload}
                    disabled={isPending}
                    className="btn-success"
                  >
                    {isPending ? 'Saving . . .' : 'Save'}
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>

            <Col sm={8} className="py-4 ps-5 ms-2 d-block align-middle">
              <Row className="my-4 mb-5">
                <Col>
                  <Card className="border-0 shadow">
                    <Card.Header className="px-5" style={{ background: 'var(--manoa-green)' }} />
                    {unreadCount
                      ? (
                        <a href="/chat">
                          <Icon.ChatDotsFill
                            className="d-flex me-3 mt-3 justify-content-center align-middle w-100 link-success"
                            style={{ width: '100px', height: '100px', color: 'var(--manoa-green)' }}
                          />
                        </a>
                      )
                      : (
                        <a href="/chat">
                          <Icon.ChatDotsFill
                            className="d-flex me-3 mt-3 justify-content-center align-middle w-100"
                            style={{ width: '100px', height: '100px', color: 'var(--manoa-green)' }}
                          />
                        </a>
                      )}
                    <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                      {unreadCount}
                      {' '}
                      new message
                      {unreadCount !== 1 ? 's' : ''}
                    </Card.Text>
                    <Card.Footer className="text-end">
                      <a href="/chat" className="link-success hover-line">
                        View messages
                        <Icon.ArrowRight className="ms-1 link-success hover-line" />
                      </a>
                    </Card.Footer>
                  </Card>
                </Col>

                <Col>
                  <Card className="border-0 shadow">
                    <Card.Header className="px-5" style={{ background: 'var(--manoa-green)' }} />
                    {matchCount
                      ? (
                        <a href="/connect">
                          <Icon.PersonPlusFill
                            className="d-flex me-3 mt-3 justify-content-center align-middle w-100 link-success"
                            style={{ width: '100px', height: '100px', color: 'var(--manoa-green)' }}
                          />
                        </a>
                      )
                      : (
                        <a href="/connect">
                          <Icon.PersonPlusFill
                            className="d-flex me-3 mt-3 justify-content-center align-middle w-100"
                            style={{ width: '100px', height: '100px', color: 'var(--manoa-green)' }}
                          />
                        </a>
                      )}
                    <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                      {matchCount}
                      {' '}
                      new match
                      {matchCount !== 1 ? 'es' : ''}
                    </Card.Text>
                    <Card.Footer className="text-end">
                      <a href="/connect" className="link-success hover-line">
                        Connect
                        <Icon.ArrowRight className="ms-1 link-success hover-line" />
                      </a>
                    </Card.Footer>
                  </Card>
                </Col>

                <Col>
                  <Card className="border-0 shadow">
                    <Card.Header className="px-5" style={{ background: 'var(--manoa-green)' }} />
                    {matchCount
                      ? (
                        <a href="/chat">
                          <Icon.PeopleFill
                            className="d-flex me-3 mt-3 justify-content-center align-middle w-100 link-success"
                            style={{ width: '100px', height: '100px', color: 'var(--manoa-green)' }}
                          />
                        </a>
                      )
                      : (
                        <a href="/chat">
                          <Icon.PeopleFill
                            className="d-flex me-3 mt-3 justify-content-center align-middle w-100"
                            style={{ width: '100px', height: '100px', color: 'var(--manoa-green)' }}
                          />
                        </a>
                      )}
                    <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                      {matchCount}
                      {' '}
                      total friend
                      {matchCount !== 1 ? 's' : ''}
                    </Card.Text>
                    <Card.Footer className="text-end">
                      <a href="/chat" className="link-success hover-line">
                        View all chats
                        <Icon.ArrowRight className="ms-1 link-success hover-line" />
                      </a>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>

              <Row className="my-5">
                <Col>
                  <Card className="border-0 shadow">
                    <div style={{ overflow: 'scroll', maxHeight: '300px' }}>
                      <Row className="overflow-auto py-3 px-4">
                        {currImgs.length > 0 ? (currImgs.map((url) => (
                          <Card className="w-50 border-0 p-3" key={url}>
                            <Card.Img
                              src={url}
                              key={url}
                              className="hover-line"
                              onClick={() => handlePhotoShow(url)}
                              style={{ verticalAlign: 'top' }}
                            />
                          </Card>
                        ))
                        ) : (
                          <p>No images found.</p>
                        )}
                      </Row>
                    </div>
                    <Card.Footer>
                      <Nav className="float-start text-black py-2 ps-3 text-heavitas">
                        {profile.firstName}
                        &apos;s Photos
                      </Nav>

                      <Nav className="float-end link-dark hover-line py-2 pe-3">
                        <a href="/upload" className="link-success hover-line">
                          Edit Photos
                          <Icon.Upload className="ms-2 mb-1 link-success hover-line" />
                        </a>
                      </Nav>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>

              <Row className="my-5">
                <Col>
                  <Card className="border-0 shadow">
                    <Card.Header className="text-light" style={{ background: 'var(--manoa-green)' }}>
                      Schedule
                    </Card.Header>
                    <Card.Body className="mt-0 py-0">
                      <Col className="bg-white mt-0 mb-5 px-0 mx-0">
                        <ListGroup className="pt-4">
                          {classData.length > 0 ? (
                            classData.map((cData) => (
                              <ListGroup.Item className="text-center" key={cData.id}>
                                <Row className="align-items-center d-flex justify-content-between">
                                  <Col xs={12} md={4} className="text-center">{cData.name}</Col>
                                  <Col
                                    xs={12}
                                    md={4}
                                    className="text-center"
                                  >
                                    {new Date(`2025-05-04T${cData.startTime}:00`)
                                      .toLocaleTimeString('en-US', {
                                        hour: 'numeric', minute: 'numeric', hour12: true })}
                                  </Col>
                                  <Col
                                    xs={12}
                                    md={4}
                                    className="text-center"
                                  >
                                    {new Date(`2025-05-04T${cData.endTime}:00`)
                                      .toLocaleTimeString('en-US', {
                                        hour: 'numeric', minute: 'numeric', hour12: true })}
                                  </Col>
                                </Row>
                                <Row className="align-items-center d-flex justify-content-between">
                                  <Col
                                    xs={12}
                                    md={4}
                                    className="text-center"
                                  >
                                    {locationLabels[cData.location] || cData.location}
                                  </Col>
                                  <Col xs={12} md={4} className="text-center">{cData.days.join(', ')}</Col>
                                  <Col xs={12} md={4} />
                                </Row>
                              </ListGroup.Item>
                            ))
                          ) : (
                            <ListGroup.Item className="text-center">No classes found</ListGroup.Item>
                          )}
                        </ListGroup>
                      </Col>
                    </Card.Body>
                    <Card.Footer className="text-end">
                      <a href="/editSchedule" className="link-success hover-line">
                        Edit Schedule
                        <Icon.ArrowRight className="ms-1 link-success hover-line" />
                      </a>
                    </Card.Footer>
                  </Card>
                </Col>

                <Col>
                  <Card className="border-0 shadow">
                    <Card.Header className="float-start text-light" style={{ background: 'var(--manoa-green)' }}>
                      Map
                    </Card.Header>
                    <Card.Text className="mx-5 pb-4 pt-4 h6 text-center">
                      <Icon.Globe size="150px" />
                    </Card.Text>
                    <p className="text-center">Coming Soon.</p>
                    <Card.Footer className="text-end">
                      <a href="/connect" className="link-success hover-line">
                        <Icon.ArrowsAngleExpand className="ms-1 link-success hover-line" />
                      </a>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Container>
        </Container>
      ) : (
        <p className="text-center mx-5 py-5">
          No profile found. Create one
          <a href="/createProfile">here.</a>
        </p>
      )}

      <Modal show={photoShow} onHide={handleClose} centered size="lg">
        <Modal.Header className="justify-content-end">
          <a className="link-success me-2 text-end hover-line" onClick={handlePhotoClose}>
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
    </>
  );
};

export default UserHome;
