import React from 'react';
import "./board.css";
import Square from '../square/Square';

const Board = ({ squares, onClick = () => { }, boardSize, winner }) => {
    let cells = [];

    const renderSquare = (x) => {
        let cellWinner = false;
        if (winner) {
            cellWinner = winner.includes(x);
        }

        return <Square key={x} value={squares[x]} onClick={() => onClick(x)} winner={winner} cellWinner={cellWinner} />;
    };

    for (let i = 0; i < boardSize; ++i) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(renderSquare(i * boardSize + j));
        }
        cells.push(<div key={i} className="board-row">{row}</div>);
    }

    return (
        <div>{cells}</div>
    );
};

export default Board;
