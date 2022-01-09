
import React, { useEffect, useState } from "react";

import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Toast } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";


export default () => {
  const [regData, setRegData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [eMessage, setEmessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleRegister = () => {
    let valStatus = validate()

    if (valStatus) {
      axios.post('https://stargazer-back.herokuapp.com/api/auth/local/register', regData)
        .then(response => {
          console.log(response)
        });
    }

  }

  const toggleDefaultToast = () => setShowToast(!showToast);

  const validate = () => {
    if (regData.email == '') {
      setEmessage('Your email is required.')
      setShowToast(true)
      return false
    }
    if (regData.password == '') {
      setEmessage('Your password is required.')
      setShowToast(true)
      return false
    }
    if (regData.username == '') {
      setEmessage('Your username is required.')
      setShowToast(true)
      return false
    }
    return true
  }

  useEffect(() => {
    console.log(regData)
  }, [regData])

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus placeholder="Username" onChange={(e) => setRegData({ ...regData, username: e.target.value })} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus type="email" placeholder="example@company.com" onChange={(e) => setRegData({ ...regData, email: e.target.value })} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control type="password" placeholder="Password" onChange={(e) => setRegData({ ...regData, password: e.target.value })} />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" onClick={() => { handleRegister() }}>
                    Sign up
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
                <Toast show={showToast} onClose={toggleDefaultToast} className="my-3" style={{ margin: '0 auto' }}>
                  <Toast.Header className="text-primary" closeButton={false}>
                    <FontAwesomeIcon icon={faExclamation} />
                    <strong className="me-auto ms-2">Oops!</strong>
                    <Button variant="close" size="xs" onClick={toggleDefaultToast} />
                  </Toast.Header>
                  <Toast.Body>
                    {eMessage}
                  </Toast.Body>
                </Toast>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
