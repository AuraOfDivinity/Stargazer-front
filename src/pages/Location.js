import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card } from '@themesberg/react-bootstrap';
import AccordionComponent from "../components/AccordionComponent";
import { TransactionsTable } from "../components/Tables";


export default () => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Location</h4>
                    <p className="mb-0">Update your location.</p>

                </div>
            </div>

            {/* <div className="table-settings mb-4">
                <Card.Body className="w-100 d-flex justify-content-between">
                    <Card.Text className="mb-0">
                        Hello World
                    </Card.Text>
                </Card.Body>
            </div> */}

            <Row>
                <Col xl={12} xs={12}>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <h5 className="mb-4">Select Your Location.</h5>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
