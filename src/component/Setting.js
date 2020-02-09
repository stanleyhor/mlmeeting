import React, { useState } from 'react';
import { FaCog } from "react-icons/fa";
import {
    Modal,
    Button,
    Form,
    Alert
} from 'react-bootstrap';

function Setting(props) {
    const [coeff, setCoeff] = useState(props.coeff);
    const [errors, setErrors] = useState([]);

    const updateCoeff = event => {
        setCoeff(event.target.value);
        setErrors([]);
    }

    const handleSaveClick = event => {
        event.preventDefault();
        let error = [];
        
        const split = coeff.split(',');
        if (split.length !== 6) {
            error.push(<div key={error.length}>Please enter 6 coefficients</div>);
        }

        for (let i=0; i<split.length; i++) {
            if (isNaN(split[i])) {
                error.push(<div key={error.length}>Every coefficients must be a float number</div>);
                break;
            }
        }
        if (error.length > 0) {
            setErrors(error);
            return;
        }

        props.handleSaveClick(coeff);
    }

    return (
        <div>
            <div style={{fontSize: '2.0em'}}>
                <div onClick={props.handleShowClick}>
                    <FaCog style={{cursor: 'pointer'}} />
                </div>
            </div>

            
            <Modal show={props.showSettingModal} onHide={props.handleShowClick}>
                <Modal.Header closeButton>
                    <Modal.Title>ML Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form onSubmit={handleSaveClick.bind(this)}>
                            <Form.Group controlId="formBasicCoef">
                                <Form.Label>ML coefficients:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter coefficients here!" 
                                    defaultValue={coeff}
                                    onChange={updateCoeff.bind(this)}
                                />
                            </Form.Group>

                            { errors.length > 0 && (
                                <Alert variant="danger">
                                    { errors }
                                </Alert>
                            )}

                            <Alert variant="warning">
                                Note: Coefficients must be float numbers.<br />
                                Total 6 coefficients seperated by comma.
                            </Alert>

                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleShowClick}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Setting;