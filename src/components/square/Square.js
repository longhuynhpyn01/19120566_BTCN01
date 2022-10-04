import React from 'react';
import "./square.css";

const Square = ({ value, onClick = () => { }, winner, cellWinner }) => {
    if (winner) {
        return (
            <button className={`square ${cellWinner ? "win" : ""}`} onClick={() => onClick()}>
                {value}
            </button>
        );
    } else {
        return (
            <button className="square" onClick={() => onClick()}>
                {value}
            </button>
        );
    }
};

export default Square;
