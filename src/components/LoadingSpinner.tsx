import { Container, Row, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Container id="bg-image" style={{ height: '100vh' }} className="d-block" fluid>
    <Row className="justify-content-md-center v-middle d-flex align-middle py-5">
      <Spinner className="text-light" animation="border" />
    </Row>
  </Container>
);

export default LoadingSpinner;
