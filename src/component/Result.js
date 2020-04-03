import React from 'react';

const resultStyle = { 
    // marginTop: 40, 
    border: '2px solid darkblue', 
    padding: '40px 20px', 
    borderRadius: 5,
    backgroundColor: 'lightblue',
    color: 'darkblue',
    width: '50vw',
    display: 'inline-block'
};

const myStyles = {
  parent: {
    textAlign: 'left',
    fontSize: '0.8em',
    color: '#ff0000',
    padding: 10
  },
  title: {
    fontWeight: 'bold',
    paddingTop: 10
  }
};

const resultTitle = { marginTop: 20, display: 'inline-block' };

function Result(props) {
    return (
        <div style={{textAlign: 'center'}}>
            <h2 style={resultTitle}>Result</h2>
            { props.result1 && (
                <div>
                  <h3 style={resultStyle}>
                    {props.result1} %
                    <br />
                    {
                      props.recommendations &&  Array.isArray(props.recommendations) && props.recommendations.length > 0 && (
                        <div style={myStyles.parent}>
                          <div style={myStyles.title}>Recommendations to improve your meeting:</div>
                          <ul>
                            {props.recommendations.map((re, i) => (<li key={i}>{re}</li>))}
                          </ul>
                        </div>
                      )
                    }
                  </h3>

                </div>
            )}
        </div>
    );
}

export default Result;