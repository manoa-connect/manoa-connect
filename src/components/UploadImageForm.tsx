/* eslint-disable no-await-in-loop */

'use client';

import { Profile } from '@prisma/client';
import { useRef, ChangeEvent, useState, useTransition, useEffect } from 'react';
import { Container, Col, Row, Image, Button, Card } from 'react-bootstrap';
import { uploadImg, loadImg, deleteImg } from '@/lib/supabase/storage/client';
import * as Icon from 'react-bootstrap-icons';

const UploadForm = ({ profile }: { profile : Profile }) => {
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [currImgs, setCurrImgs] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const imgInputRef = useRef<HTMLInputElement>(null);

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

    fetchImages();
  }, [profile.id]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImgURLs = filesArray.map((file) => URL.createObjectURL(file));

      setImgURLs([...imgURLs, ...newImgURLs]);
    }
  };

  const handleClickUpload = () => {
    const fetchImages = async () => {
      const { images, error } = await loadImg('manoa-connect-pics', profile.id.toString());

      if (error) {
        console.error(error);
      } else {
        setCurrImgs(images || []);
      }
    };

    startTransition(async () => {
      const URLs: (string | undefined)[] = [];
      for (const url of imgURLs) {
        const imgFile = await convertBlobUrlToFile(url);

        const { imgURL, error } = await uploadImg({
          file: imgFile,
          bucket: 'manoa-connect-pics',
          folder: profile.id.toString(),
        });

        if (error) {
          console.error(error);
          return;
        }

        URLs.push(imgURL);
      }

      console.log(URLs);
      setImgURLs([]);
      setCurrImgs((prev) => [...prev, ...URLs.filter((url): url is string => url !== undefined)]);
      await fetchImages();
    });
  };

  const handleClickDelete = async (url: string) => {
    const { error } = await deleteImg(url);

    if (error) {
      console.error(error);
    } else {
      setCurrImgs((prev) => prev.filter((img) => img !== url));
    }
  };

  return (
    <Container id="bg-image" className="justify-content-center" fluid>
      <Container className="d-flex mx-5 v-middle">
        <Col sm={5} className="bg-white py-5 px-5 me-5">
          <Row className="d-flex pb-5">
            <a className="link-success hover-line text-end" href="/profile">
              <Icon.ArrowLeft className="link-success me-2" />
              Back to Profile
            </a>
          </Row>

          <Row>
            <h1 className="text-center pt-4 pb-0 mx-0 text-heavitas">
              Current Photos
            </h1>
            <p className="text-center pb-2">
              You currently have
              {` ${currImgs.length}`}
              {' '}
              {currImgs.length === 1 ? 'photo' : 'photos'}
            </p>
          </Row>

          <Row className="px-5 pb-1">
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              ref={imgInputRef}
              onChange={handleImageChange}
              disabled={isPending}
            />

            <Button
              onClick={() => imgInputRef.current?.click()}
              disabled={isPending}
              className="btn-light"
            >
              Select Image
            </Button>

            <Button
              type="submit"
              onClick={handleClickUpload}
              disabled={isPending}
              className="btn-success my-2"
            >
              {isPending ? 'Uploading . . .' : 'Upload Image'}
            </Button>
          </Row>

          <Container className="d-flex pb-5 justify-content-center">
            {imgURLs.map((url, index) => (
              <Image
                key={url}
                src={url}
                alt={`img-${index}`}
                style={{ width: '150px', height: '150px', objectFit: 'cover', maxHeight: '150px' }}
                />
            ))}
          </Container>
        </Col>

        <Col id="no-overflow-x" className="py-5 mx-0 pe-5 overflow-y-scroll w-100">
          {currImgs.length > 0 ? (
            currImgs.map((url, index) => (
              <Container className="px-2" key={index}>
                <Col>
                  <Image className="mx-3 mt-3 mb-2" key={url} src={url} width="100%" alt={`img-${index}`} rounded />
                  <Card.Footer onClick={() => handleClickDelete(url)}className="link-danger hover-line text-end pb-3">
                    <Icon.Trash />
                    {' '}
                    Delete
                  </Card.Footer>
                </Col>
              </Container>
            ))
          ) : (
            <p className="text-light">No images found. </p>
          )}
        </Col>
      </Container>
    </Container>
  );
};

export default UploadForm;
