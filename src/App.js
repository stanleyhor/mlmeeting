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

let coeff = [1.10097287e-03, 7.26512440e-04, 9.13754221e-04, -8.88528634e-05, 3.82755795e-02, -0.13594509584532183];
let coeffForResult1 = {a: 1666, b: -16.66};


function App() {
  // const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [result1, setResult1] = useState('');
  const [recommendations, setRecommendations] = useState([]);

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
    let finalScore = theCoeffs[0] * numAgenda + theCoeffs[1] * startOnTime + theCoeffs[2] * endOnTime + theCoeffs[3] * goodConclusion + theCoeffs[4] * peopleDiff + (+theCoeffs[5]);
    // finalScore = coeff[6]/finalScore;

    console.log('---',numAgenda, startOnTime, endOnTime, goodConclusion, peopleDiff, '=', finalScore);
    
    // normalize finalScore to a proper range for display
    let finalScore1 = coeffForResult1.a * finalScore + coeffForResult1.b;
    if (finalScore1 > 100) {
      finalScore1 = 100;
    }
    if (finalScore1 < 0) {
      finalScore1 = 0;
    }

    setResult1(~~finalScore1);

    let recommend = getRecommendations({finalScore: finalScore1, startOnTime, endOnTime, goodConclusion, peopleDiff});
    setRecommendations(recommend);

    scrollToTop();
  }

  const getRecommendations = ({finalScore, startOnTime, endOnTime, goodConclusion, peopleDiff}) => {
    let recommendations = [];
    if (finalScore < 80) {
      if (peopleDiff < 0.8) {
        recommendations.push('Better attendance next time!');
      }

      const { recommendation } = getMin({startOnTime, endOnTime, goodConclusion});

      recommendations.push(recommendation);
    }

    return recommendations;
  };

  const getMin = ({startOnTime, endOnTime, goodConclusion}) => {
    let recommendation = 'Start the meeting on-time';
    let min = {name: 'startOnTime', value: startOnTime};
    if (endOnTime < min.value) {
      recommendation = 'End the meeting on-time';
      min = {name: 'endOnTime', value: endOnTime};
    }
    if (goodConclusion < min.value) {
      recommendation = 'Conclude the agendas as much as possible';
      min = {name: 'goodConclusion', value: goodConclusion};
    }
    min.recommendation = recommendation;
    return min;
  };

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 15);
    }
  };

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
          <Col>
            { result1 && (
              <Result result1={result1} recommendations={recommendations} />
            )}
            <Fade in={true}>
              <MeetingForm calculateResult={calculateResult} />
            </Fade>
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
