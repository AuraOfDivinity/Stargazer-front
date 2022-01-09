import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import AccordionComponent from "../components/AccordionComponent";
import { TransactionsTable } from "../components/Tables";

export default () => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>What is Stargazer</h4>
                    <p className="mb-0">Your web analytics dashboard template.</p>
                </div>
            </div>

            <div className="table-settings mb-4">
                <AccordionComponent
                    defaultKey="panel-1"
                    data={[
                        {
                            id: 1,
                            eventKey: "panel-1",
                            title: "What is Stargazer",
                            description: "Stargazer is a web application that simply helps you to keep track of staellites."
                        },
                        {
                            id: 2,
                            eventKey: "panel-2",
                            title: "What is a FAQ document?",
                            description: "At Themesberg, our mission has always been focused on bringing openness and transparency to the design process. We've always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. We're proud to be a part of creating a more open culture and to continue building a product that supports this vision."
                        },
                        {
                            id: 3,
                            eventKey: "panel-3",
                            title: "What are the top 10 interview questions?",
                            description: "At Themesberg, our mission has always been focused on bringing openness and transparency to the design process. We've always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. We're proud to be a part of creating a more open culture and to continue building a product that supports this vision."
                        }
                    ]} />
            </div>
        </>
    );
};
