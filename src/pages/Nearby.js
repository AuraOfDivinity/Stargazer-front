import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faHeart, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card, Toast } from '@themesberg/react-bootstrap';
import AccordionComponent from "../components/AccordionComponent";
import { TransactionsTable } from "../components/Tables";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default () => {
    const [rowData, setRowdata] = useState([])
    const location = useLocation()
    const [gridApi, setGridApi] = useState(null);
    const [isFirst, setIsFirst] = useState(true)
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const [showFailureToast, setShowFailureToast] = useState(false)

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleFailureToast = () => setShowFailureToast(!showFailureToast);

    const onGridReady = (params) => {
        setGridApi(params.api);
    }

    useEffect(() => {
        if (gridApi) {
            gridApi.sizeColumnsToFit();
        }
    }, [gridApi]);

    const ActionsComponent = ({ params }) => {
        return (
            <Button variant="outline-success" size="sm" className="m-1"
                onClick={() => {
                    console.log(params?.data)
                    subscribeToSatellite(params.data.norad_id)
                }}
            >
                <FontAwesomeIcon icon={faHeart} className="me-2" />
                Subscribe
            </Button>
        );
    };

    const subscribeToSatellite = (id) => {
        let token = localStorage.getItem('access_token')
        axios.post(`https://stargazer-back.herokuapp.com/api/satellites/susbcribe?norad_id=${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status == 200) {
                    console.log(response)
                    if (response.data.passesAvailable === true) {
                        setShowSuccessToast(true)
                    } else {
                        setShowFailureToast(true)
                    }
                }
            });
    }

    const fetchSatellites = () => {
        let token = localStorage.getItem('access_token')
        axios.get(`https://stargazer-back.herokuapp.com/api/satellites/suggested`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status == 200) {
                    let satData = []
                    console.log(response.data)
                    response.data.above.forEach((sat) => {
                        satData.push({
                            norad_id: sat.satid,
                            satellite_name: sat.satname,
                            launch_date: sat.launchDate,
                            current_latitude: sat.satlat,
                            current_longitude: sat.satlng
                        })
                    })
                    satData.unshift({
                        norad_id: 25544,
                        satellite_name: `ISS`,
                        launch_date: `1998-11-20`
                    })
                    setRowdata(satData)
                }
            });
    }

    useEffect(() => {
        fetchSatellites()
        setInterval(() => {
            fetchSatellites()
        }, 10000)
    }, [location])
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Nearby Satellites</h4>
                    <p className="mb-0">Following are a set of satellites orbiting nearby based on your current device location.</p>
                </div>
            </div>

            <div className="table-settings mb-4">
                <Row>
                    <Col xl={12} xs={12}>
                        <Card border="light" className="bg-white shadow-sm mb-4" style={{ height: '600px' }}>
                            <Card.Body>
                                <div
                                    className="ag-theme-alpine"
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <AgGridReact
                                        rowData={rowData}
                                        onGridReady={onGridReady}
                                    >
                                        <AgGridColumn headerName="Satellite Norad ID" field="norad_id"></AgGridColumn>
                                        <AgGridColumn headerName="Satellite Name" field="satellite_name"></AgGridColumn>
                                        <AgGridColumn headerName="Launch Date" field="launch_date"></AgGridColumn>
                                        <AgGridColumn headerName="Current Latitude" field="current_latitude"></AgGridColumn>
                                        <AgGridColumn headerName="Current Longitude" field="current_longitude"></AgGridColumn>
                                        <AgGridColumn headerName="" field="action"
                                            cellRendererFramework={(params) => {
                                                return (
                                                    <ActionsComponent params={params} />
                                                )
                                            }}
                                        ></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Toast show={showSuccessToast} onClose={toggleSuccessToast} className="my-3 bg-success" style={{ margin: '0 auto' }}>
                    <Toast.Header className="text-primary" closeButton={false}>
                        <FontAwesomeIcon icon={faExclamation} />
                        <strong className="me-auto ms-2">Success</strong>
                        <Button variant="close" size="xs" onClick={toggleSuccessToast} />
                    </Toast.Header>
                    <Toast.Body style={{ color: 'white' }}>
                        You have successfully subscribed to a satellite that has future passes. Check Subscribed satellites page to see it's upcoming passes near your location.
                    </Toast.Body>
                </Toast>
                <Toast show={showFailureToast} onClose={toggleFailureToast} className="my-3 bg-warning" style={{ margin: '0 auto' }}>
                    <Toast.Header className="text-primary" closeButton={false}>
                        <FontAwesomeIcon icon={faExclamation} />
                        <strong className="me-auto ms-2">Failure</strong>
                        <Button variant="close" size="xs" onClick={toggleFailureToast} />
                    </Toast.Header>
                    <Toast.Body style={{ color: 'white' }}>
                        The selected satellite does not pass by your location in the near future. Please try again later.
                    </Toast.Body>
                </Toast>
            </div>
        </>
    );
};
