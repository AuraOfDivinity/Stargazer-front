import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card } from '@themesberg/react-bootstrap';
import AccordionComponent from "../components/AccordionComponent";
import { TransactionsTable } from "../components/Tables";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


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


            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>

        </>
    );
};
