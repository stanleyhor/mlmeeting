import React from 'react';

const resultStyle = { 
    marginTop: 40, 
    border: '2px solid darkblue', 
    padding: '40px 20px', 
    borderRadius: 5,
    backgroundColor: 'lightblue',
    color: 'darkblue'
};
const resultTitle = { marginTop: 20 };

function Result(props) {
    return (
        <div>
            <h2 style={resultTitle}>Result</h2>
            { props.result1 && (
                <h3 style={resultStyle}>{props.result1}</h3>
            )}
        </div>
    );
}

export default Result;