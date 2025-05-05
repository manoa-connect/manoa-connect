'use client';

import { useSession } from 'next-auth/react';
import { Button, Navbar, Col, Container, Form, Row, Image, ListGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addClass, deleteClass } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createClassSchema } from '@/lib/validationSchemas';
import logo from "../../public/assets/manoa-connect_logo.svg";
import { Class } from '@prisma/client';
import { TrashFill } from 'react-bootstrap-icons';
import { locationLabels } from '@/lib/locationMappings';
const onSubmit = async (data: { 
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  days: string[];
  email: string;
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addClass(data);
  swal('Success', 'Your class has been created', 'success', {
    timer: 2000,
  });
};

const ScheduleForm = ({ classData }: { classData: Class[] }) => {
  const { data: session, status } = useSession();
  // console.log('createScheduleForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createClassSchema),
  });
  const handleDelete = async (id: number) => {
    // console.log(`handleDelete id: ${id}`);
    await deleteClass(id);
    swal('Success', 'Your class has been deleted', 'success', {
      timer: 2000,
    });
  };
  const dayOptions = ["M", "T", "W", "R", "F", "Other"];
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }
  console.log("ClassData:", classData);

  return (
    <Container id="bg-image" fluid>
      <Container className="py-5">
        <Row className="justify-content-center pt-3">
          <Col xs={5} className="bg-white pb-5 mt-5 mb-5 my-auto px-4 mx-3">
            <Navbar className="pt-5 justify-content-center align-middle text-center">
              <Image src ={logo.src} width="50px" alt="Manoa Connect" className="my-auto"/>
              <Navbar.Text className="text-center text-black text-heavitas h1 mt-4 ms-2">Your Classes</Navbar.Text>
            </Navbar>
            <ListGroup className="pt-4">
              {classData.length > 0 ? (
                classData.map((cData) => (
                  <ListGroup.Item className="text-center" key={cData.id}>
                    <Row className="align-items-center d-flex justify-content-between">
                      <Col xs={12} md={4} className="text-center">{cData.name}</Col>
                      <Col xs={12} md={4} className="text-center">{new Date(`2025-05-04T${cData.startTime}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Col>
                      <Col xs={12} md={4} className="text-center">{new Date(`2025-05-04T${cData.endTime}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Col>
                    </Row>
                    <Row className="align-items-center d-flex justify-content-between">
                      <Col xs={12} md={4} className="text-center">{locationLabels[cData.location] || cData.location}</Col>
                      <Col xs={12} md={4} className="text-center">{cData.days.join(', ')}</Col>
                      <Col xs={12} md={4}>
                        <Button variant="danger" className="btn-sm" onClick={() => handleDelete(cData.id)}>
                          <TrashFill />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className="text-center">No classes found</ListGroup.Item>
              )}
            </ListGroup>
          </Col>

          <Col xs={5} className="bg-white pb-5 mt-5 mb-5 my-auto px-4 mx-3">
            <Navbar className="pt-5 justify-content-center align-middle text-center">
              <Image src={logo.src} width="50px" alt="Manoa Connect" className="my-auto"/>
              <Navbar.Text className="text-center text-black text-heavitas h1 mt-4 ms-2">Add Class</Navbar.Text>
            </Navbar>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col>
                  <Form.Group className="form-group pe-3 py-3">
                    <Form.Label>Class Name</Form.Label>
                    <input
                      type="text"
                      {...register('name')}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="form-group pe-3 py-3">
                    <Form.Label>Start Time</Form.Label>
                    <input
                      type="time"
                      {...register('startTime', { required: 'Time is required' })}
                      className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.startTime?.message}</div>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="form-group pe-3 py-3">
                    <Form.Label>End Time</Form.Label>
                    <input
                      type="time"
                      {...register('endTime', { required: 'Time is required' })}
                      className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.endTime?.message}</div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="form-group ps-3 py-3">
                    <Form.Label>Location</Form.Label>
                    <select {...register("location")} className={`form-control ${errors.location ? "is-invalid" : ""}`}>
                      <option value="Other">Other</option>
                      <option value="ArchitectureSchool">Architecture School</option>
                      <option value="AgriculturalScience">Agricultural Science</option>
                      <option value="ArtBuilding">Art Building</option>
                      <option value="BachmanHall">Bachman Hall</option>
                      <option value="BilgerHall">Bilger Hall</option>
                      <option value="BiomedicalSciences">Biomedical Sciences</option>
                      <option value="BurnsHall">Burns Hall</option>
                      <option value="CenterforKoreanStudies">Center for Korean Studies</option>
                      <option value="CrawfordHall">Crawford Hall</option>
                      <option value="DanceBuilding">Dance Building</option>
                      <option value="DeanHall">Dean Hall</option>
                      <option value="EdmondsonHall">Edmondson Hall</option>
                      <option value="FrearHall">Frear Hall</option>
                      <option value="GartleyHall">Gartley Hall</option>
                      <option value="GeorgeHall">George Hall</option>
                      <option value="GilmoreHall">Gilmore Hall</option>
                      <option value="HawaiiHall">Hawaii Hall</option>
                      <option value="HemenwayHall">Hemenway Hall</option>
                      <option value="HenkeHall">Henke Hall</option>
                      <option value="HolmesHall">Holmes Hall</option>
                      <option value="InformationTechnologyCenter">Information Technology Center</option>
                      <option value="JeffersonHall">Jefferson Hall</option>
                      <option value="JohnsonHall">Johnson Hall</option>
                      <option value="JohnABurnsSchoolofMedicine">John A. Burns School of Medicine</option>
                      <option value="KamakakuokalaniCenterforHawaiianStudies">Kamakakūokalani Center for Hawaiian Studies</option>
                      <option value="KellerHall">Keller Hall</option>
                      <option value="KennedyTheatre">Kennedy Theatre</option>
                      <option value="KraussHall">Krauss Hall</option>
                      <option value="KuykendallHall">Kuykendall Hall</option>
                      <option value="LawSchool">Law School</option>
                      <option value="LincolnHall">Lincoln Hall</option>
                      <option value="MarineSciencesBuilding">Marine Sciences Building</option>
                      <option value="MillerHall">Miller Hall</option>
                      <option value="MooreHall">Moore Hall</option>
                      <option value="MusicBuildingComplex">Music Building Complex</option>
                      <option value="PacificBiosciencesResearchCenter">Pacific Biosciences Research Center</option>
                      <option value="PacificOceanScienceandTechnology">Pacific Ocean Science and Technology</option>
                      <option value="PhysicalPlantBuilding">Physical Plant Building</option>
                      <option value="PhysicalScienceBuilding">Physical Science Building</option>
                      <option value="PopeLaboratory">Pope Laboratory</option>
                      <option value="SakamakiHall">Sakamaki Hall</option>
                      <option value="SaundersHall">Saunders Hall</option>
                      <option value="ShermanLaboratory">Sherman Laboratory</option>
                      <option value="ShidlerCollegeofBusiness">Shidler College of Business</option>
                      <option value="SnyderHall">Snyder Hall</option>
                      <option value="SpaldingHall">Spalding Hall</option>
                      <option value="StJohnPlantScienceLab">St. John Plant Science Lab</option>
                      <option value="WatanabeHall">Watanabe Hall</option>
                      <option value="WebsterHall">Webster Hall</option>
                    </select>
                    <div className="invalid-feedback">{errors.location?.message}</div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="form-group ps-3 py-3">
                    <Form.Label>Days</Form.Label>
                    <div className="d-flex flex-wrap">
                      {dayOptions.map((day) => (
                        <div key={day} className="form-check pe-3">
                          <input
                            type="checkbox"
                            {...register("days", { required: "Day is required" })}
                            value={day}
                          />
                          <label className="form-check-label">{day}</label>
                        </div>
                      ))}
                    </div>
                    <div className="invalid-feedback">{errors.days?.message}</div>
                  </Form.Group>
                </Col>
              </Row> 
              <input type="hidden" {...register('email')} value={currentUser} />

              <Row>
                <Col className="justify-content-end d-flex">
                  <a type="button" onClick={() => reset()} className="link-danger text-end pe-2 pt-3 hover-line">
                        Reset Form
                  </a>
                </Col>
              </Row>
              <Container className="px-3 pt-4">
                <Row>
                  <Button type="submit" className="btn btn-success">
                    Create
                  </Button>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ScheduleForm;
