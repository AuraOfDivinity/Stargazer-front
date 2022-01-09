import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card } from '@themesberg/react-bootstrap';
import AccordionComponent from "../components/AccordionComponent";
import { TransactionsTable } from "../components/Tables";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default () => {
    const location = useLocation()
    const [gridApi, setGridApi] = useState(null);
    const user = useSelector(state => state.auth.user)
    const [rowData, setRowdata] = useState([])

    const onGridReady = (params) => {
        setGridApi(params.api);
    }

    useEffect(() => {
        if (gridApi) {
            gridApi.sizeColumnsToFit();
        }
    }, [gridApi]);

    const fetchPasses = () => {
        let token = localStorage.getItem('access_token')
        axios.post(`https://stargazer-back.herokuapp.com/graphql`, {
            query: `query{
                usersPermissionsUsers(filters: { email: { eq: "${user.email}" }}){
                data{
                  id
                  attributes{
                    subscribed_satellites{
                      data{
                        id
                        attributes{
                          satellite_name
                          satellite_norad_id
                          passes{
                            data{
                              id
                              attributes{
                                start_utc
                                end_utc
                                start_azimuth
                                end_azimuth
                                start_azimuth_compass
                                end_azimuth_compass
                                duration
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response)
            let passData = []
            let subscribed_satellites = response.data.data.usersPermissionsUsers.data[0].attributes.subscribed_satellites.data
            console.log(subscribed_satellites.length)
            subscribed_satellites.forEach((sub_sat) => {
                sub_sat.attributes.passes.data.forEach((pass) => {
                    let item = pass.attributes
                    passData.push({
                        satellite: sub_sat.attributes.satellite_name,
                        start_utc: new Date(item.start_utc * 1000).toString(),
                        end_utc: new Date(item.end_utc * 1000).toString(),
                        start_az: item.start_azimuth,
                        end_az: item.end_azimuth,
                        start_azimuth_compass: item.start_azimuth_compass,
                        end_azimuth_compass: item.end_azimuth_compass,
                        duration: item.duration
                    })
                })
            })
            console.log(passData, "passdata")
            setRowdata(passData)
        })
    }

    useEffect(() => {
        fetchPasses()
    }, [location])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Subscriptions</h4>
                    <p className="mb-0">Upcoming passes of your subscribed satellites.</p>
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
                                        <AgGridColumn headerName="Satellite" field="satellite"></AgGridColumn>
                                        <AgGridColumn headerName="Start Time" field="start_utc"></AgGridColumn>
                                        <AgGridColumn headerName="End Time" field="end_utc"></AgGridColumn>
                                        <AgGridColumn headerName="Duration" field="duration"></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};
