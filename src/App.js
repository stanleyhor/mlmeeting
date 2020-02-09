import React, { useState } from 'react';

import {
  Container, 
  Row,
  Col,
  Fade
} from 'react-bootstrap';

import MeetingForm from './component/MeetingForm';
import Result from './component/Result';
import Setting from './component/Setting';
import Header from './component/Header';
import FormTitle from './component/FormTitle';

import logo from './logo.svg';
import './App.css';

let coeff = [1.10097287e-03 , 7.26512440e-04 , 9.13754221e-04 , -8.88528634e-05,
  3.82755795e-02];



function App() {
  // const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [result, setResult] = useState('');

  const temp = coeff.join(',');

  const [coeffs, setCoeffs] = useState(temp);

  const handleSettingOnClick = _ => {
    setSettingOpen(!settingOpen);
  }

  const handleSettingSaveClick = val => {
    // TODO: save settings
    // console.log('---saving:', val);
    setCoeffs(val);
    handleSettingOnClick();
  }

  const calculateResult = ({numAgenda, startOnTime, endOnTime, goodConclusion, agendaConfirmed, peopleDiff}) => {
    // const confirmed = agendaConfirmed ? 1 : 0;
    let theCoeffs = coeffs.split(',');
    let finalScore = theCoeffs[0] * numAgenda + theCoeffs[1] * startOnTime + theCoeffs[2] * endOnTime + theCoeffs[3] * goodConclusion + theCoeffs[4] * peopleDiff;
    // finalScore = coeff[6]/finalScore;

    console.log('---',numAgenda, startOnTime, endOnTime, goodConclusion, peopleDiff, '=', finalScore);
    
    finalScore = finalScore.toFixed(6);
    setResult(finalScore);
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <Header />
            <FormTitle />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 1}}>
            <Fade in={true}>
              <MeetingForm calculateResult={calculateResult} />
            </Fade>
          </Col>
          <Col md={{ span: 3, offset: 2}} style={{textAlign: 'center'}}>
            <Result result={result} />
          </Col>
        </Row>
        <div style={{position: 'absolute', bottom: 30, right: 30}}>
        <Setting 
          showSettingModal={settingOpen} 
          handleSaveClick={handleSettingSaveClick.bind(this)} 
          handleShowClick={handleSettingOnClick.bind(this)}
          coeff={coeffs}
        />
      </div>
      </Container>
    </React.Fragment>
  );
}

export default App;
