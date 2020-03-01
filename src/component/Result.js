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
const resultTitle = { marginTop: 20, display: 'inline-block' };

function Result(props) {
    return (
        <div style={{textAlign: 'center'}}>
            <h2 style={resultTitle}>Result</h2>
            { props.result1 && (
                <div>
                <h3 style={resultStyle}>{props.result1}</h3>
                </div>
            )}
        </div>
    );
}

export default Result;