import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card, Toast } from '@themesberg/react-bootstrap';
import AccordionComponent from "../components/AccordionComponent";
import { TransactionsTable } from "../components/Tables";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useHistory } from "react-router-dom";

export default () => {
    let history = useHistory()
    const [position, setPosition] = useState(null)
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    function LocationMarker() {

        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                console.log(e.latlng)
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);

    useEffect(() => {
        let token = localStorage.getItem('access_token')

        if (position) {
            axios.post(`https://stargazer-back.herokuapp.com/api/satellites/updateLocation?long=${position.lng}&lat=${position.lat}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status == 200) {
                        console.log(response)
                        setShowSuccessToast(true)
                    }
                });
        }
    }, [position])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Location</h4>
                    <p className="mb-0">Click the map to update your location based on the device's current detected location.</p>

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
                    <Card border="light" className="bg-white shadow-sm mb-4" style={{ height: '800px' }}>
                        <Card.Body>
                            <h5 className="mb-4">Select Your Location.</h5>
                            <MapContainer
                                center={{ lat: 51.505, lng: -0.09 }}
                                zoom={13}
                                scrollWheelZoom={false}
                                style={{ height: "60%", width: "100%" }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker />
                            </MapContainer>,
                            <Toast show={showSuccessToast} onClose={toggleSuccessToast} className="my-3 bg-success" style={{ margin: '0 auto' }}>
                                <Toast.Header className="text-primary" closeButton={false}>
                                    <FontAwesomeIcon icon={faExclamation} />
                                    <strong className="me-auto ms-2">Success</strong>
                                    <Button variant="close" size="xs" onClick={toggleSuccessToast} />
                                </Toast.Header>
                                <Toast.Body style={{ color: 'white' }}>
                                    Your user location has been succesfully updated to, Latitude :{position?.lat} Longitude:{position?.lng}.
                                    View the nearby satellites page to get a list of satellites orbitting near your selected location.
                                </Toast.Body>
                            </Toast>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
