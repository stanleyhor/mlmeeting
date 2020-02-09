import React, { useState } from 'react';
import {
    Form,
    Button,
    InputGroup,
    Alert
} from 'react-bootstrap';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const num = {
    NUM_AGENDA: {
        num: 1,
        variable: 'numAgenda'
    },
    START_ON_TIME: {
        num: 2,
        variable: 'startOnTime'
    },
    END_ON_TIME: {
        num: 3,
        variable: 'endOnTime'
    },
    GOOD_CONCLUSION: {
        num: 4,
        variable: 'goodConclusion'
    },
    PEOPLE_EXPECTED: {
        num: 5,
        variable: 'peopleExpected'
    },
    PEOPLE_SHOWN_UP: {
        num: 6,
        variable: 'peopleShownUp'
    },
    AGENDA_CONFIRMED: {
        num: 7,
        variable: 'agendaConfirmed'
    }
}

const Handle = Slider.Handle;
const wrapperStyle = { width: 400, margin: 50 };
const minStyle = {display: 'inline-block', position: 'relative', left: 0, textAlign: 'left'};
const maxStyle = {display: 'inline-block', position: 'absolute', right: 0, textAlign: 'right'};
const alertStyle = {marginTop: 30};

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <React.Fragment>
            <div>
                <Handle value={value} {...restProps} />
            </div>
            <div style={{width: '100%', textAlign: 'right'}}>
                {value}
            </div>
      </React.Fragment>
    );
};

// const showTarget = (id, val) => {
//     console.log('----', id, '--1--', val.target.value);
// }

// const showValue = (id, val) => {
//     console.log('----', id, '--1--', val);
// }

function MeetingForm(props) {
    const [numAgenda, setNumAgenda] = useState(0);
    const [startOnTime, setStartOnTime] = useState(100);
    const [endOnTime, setEndOnTime] = useState(100);
    const [goodConclusion, setGoodConclusion] = useState(100);
    const [peopleExpected, setPeopleExpected] = useState('--');
    const [peopleShownUp, setPeopleShownUp] = useState('--');
    const [agendaConfirmed, setAgendaConfirmed] = useState(true);
    const [validated, setValidated] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const showId = (id, val) => {
        switch(id) {
            case (num.NUM_AGENDA.num):
                // showValue(id, val);
                setNumAgenda(val);
                break;
            case (num.START_ON_TIME.num):
                // showValue(id, val);
                setStartOnTime(val);
                break;
            case (num.END_ON_TIME.num):
                // showValue(id, val);
                setEndOnTime(val);
                break;
            case (num.GOOD_CONCLUSION.num):
                // showValue(id, val);
                setGoodConclusion(val);
                break;
            case (num.PEOPLE_EXPECTED.num):
                // showTarget(id, val);
                setPeopleExpected(val.target.value);
                break;
            case (num.PEOPLE_SHOWN_UP.num):
                // showTarget(id, val);
                setPeopleShownUp(val.target.value);
                break;
            case (num.AGENDA_CONFIRMED.num): 
                // showTarget(id, val);
                setAgendaConfirmed(val.target.checked);
                break;
            default:
                // showValue(id, val);
        }
    }

    const handleSubmit = (setShowAlert, event) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log('---', numAgenda, startOnTime, endOnTime, goodConclusion, peopleExpected, peopleShownUp, agendaConfirmed);

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setShowAlert(true);
        } else {
            setShowAlert(false);

            const peopleDiff = (+peopleShownUp)/(+peopleExpected);
            // const peopleDiff = Math.abs((+peopleExpected) - (+peopleShownUp));
            
            console.log('---', numAgenda, startOnTime, endOnTime, goodConclusion, peopleExpected, peopleShownUp, agendaConfirmed, peopleDiff);
            
            props.calculateResult({numAgenda, startOnTime, endOnTime, goodConclusion, agendaConfirmed, peopleDiff});


        }
        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit.bind(this, setShowAlert)}>
            <div style={wrapperStyle}>
                <div style={{marginTop: 20}}>
                    <div>
                        Number of Agendas Added During Meeting?
                    </div>
                    <div style={{display: 'block', position: 'relative'}}>
                        <div style={minStyle}>0</div>
                        <div style={maxStyle}>10</div>
                    </div>
                    <div style={{display: 'block'}}>
                        <Slider 
                            dots={true} 
                            min={0} 
                            max={10} 
                            defaultValue={0} 
                            handle={handle} 
                            onChange={showId.bind(this, num.NUM_AGENDA.num)} 
                        />
                    </div>
                </div>

                <div style={{marginTop: 40}}>
                    <div>
                        Meeting Started On Time?
                    </div>
                    <div style={{display: 'block', position: 'relative'}}>
                        <div style={minStyle}>Not on time at all</div>
                        <div style={maxStyle}>Exactly on time</div>
                    </div>
                    <div style={{display: 'block'}}>
                        <Slider 
                            dots={true} 
                            min={50} 
                            max={100} 
                            defaultValue={100} 
                            handle={handle} 
                            onChange={showId.bind(this, num.START_ON_TIME.num)}
                        />
                    </div>
                </div>

                <div style={{marginTop: 40}}>
                    <div>
                        Meeting Ended On Time?
                    </div>
                    <div style={{display: 'block', position: 'relative'}}>
                        <div style={minStyle}>Not on time at all</div>
                        <div style={maxStyle}>Exactly on time</div>
                    </div>
                    <div style={{display: 'block'}}>
                        <Slider 
                            dots={true} 
                            min={50} 
                            max={100} 
                            defaultValue={100} 
                            handle={handle} 
                            onChange={showId.bind(this, num.END_ON_TIME.num)}
                        />
                    </div>
                </div>


                <div style={{marginTop: 40}}>
                    <div>
                        Meeting Resulted in Good Conclusion?
                    </div>
                    <div style={{display: 'block', position: 'relative'}}>
                        <div style={minStyle}>Disagree</div>
                        <div style={maxStyle}>Agree</div>
                    </div>
                    <div style={{display: 'block'}}>
                        <Slider 
                            dots={true} 
                            min={50} 
                            max={100} 
                            defaultValue={100} 
                            handle={handle} 
                            onChange={showId.bind(this, num.GOOD_CONCLUSION.num)}
                        />
                    </div>
                </div>


                <div style={{marginTop: 40}}>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend style={{paddingRight: 20}}>
                                Number of People Expected For the Meeting: 
                            </InputGroup.Prepend>
                            <Form.Control 
                                required
                                type="number"
                                id="people-attended" 
                                aria-describedby="basic-addon3" 
                                onChange={showId.bind(this, num.PEOPLE_EXPECTED.num)}
                            />
                        </InputGroup>
                    </div>
                </div>



                <div style={{marginTop: 40}}>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend style={{paddingRight: 20}}>
                                Number of People Shown Up in the Meeting: 
                            </InputGroup.Prepend>
                            <Form.Control  
                                required
                                type="number"
                                id="people-shown-up" 
                                aria-describedby="basic-addon3"
                                onChange={showId.bind(this, num.PEOPLE_SHOWN_UP.num)}
                            />
                        </InputGroup>
                    </div>
                </div>
                

                <Form.Group controlId="agenda-confirmed">
                    <Form.Check 
                        type="checkbox" 
                        label="Agenda Confirmed Before Meeting?" 
                        onChange={showId.bind(this, num.AGENDA_CONFIRMED.num)}
                    />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit"
                >
                    Submit
                </Button>

                <p style={alertStyle}>
                    <Alert show={showAlert} variant="danger">
                        <div>Something is wrong, please check!</div>
                    </Alert>
                </p>
            </div>
        </Form>
    );
}

export default MeetingForm;