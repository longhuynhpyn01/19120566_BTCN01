import React, { useState } from "react";
import "./App.css";

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] & squares[a] === squares[d] & squares[a] === squares[e]) {
            return [a, b, c, d, e];
        }
    }

    return null;
};

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

const Board = ({ squares, onClick = () => { }, boardSize, winner }) => {
    const renderSquare = (i) => {
        let cellWinner = false;
        if (winner) {
            const [a, b, c, d, e] = winner;
            cellWinner = (a === i) || (b === i) || (c === i) || (d === i) || (e === i);
        }
        return <Square key={i} value={squares[i]} onClick={() => onClick(i)} winner={winner} cellWinner={cellWinner} />;
    };

    let cells = [];
    for (let i = 0; i < boardSize; ++i) {
        let row = [];
        for (let j = 0; j < boardSize; ++j) {
            row.push(renderSquare(i * boardSize + j));
        }
        cells.push(<div key={i} className="board-row">{row}</div>);
    }

    return (
        <div>{cells}</div>
    );
};

const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(25).fill(null), // lưu kết quả trò chơi hiện tại
        lastMove: null, // lưu trữ bước di chuyển hiện tại được chọn theo [row, col]
    }]);
    const [stepNumber, setStepNumber] = useState(0); // lưu bước hiện tại
    const [xIsNext, setXIsNext] = useState(true); // lưu trạng thái [X,O]
    const [ascend, setAscend] = useState(false); // lưu tăng dần hay giảm dần
    const current = history[stepNumber]; // lấy kết quả trò chơi tại nước người chơi chọn quay lại
    const winner = calculateWinner(current.squares); // kiểm tra xem có người thắng cuộc hay chưa

    const moves = history.map((step, move) => {
        if (ascend) {
            move = history.length - 1 - move;
        }

        const desc = move ?
            `Go to move #${move} at (${history[move].lastMove.toString()})` :
            "Go to game start";
        if (move === stepNumber) {
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}><b>{desc}</b></button>
                </li>
            );
        } else {
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{desc}</button>
                </li>
            );
        }
    });

    let status;
    if (winner) {
        status = "Winner: " + current.squares[winner[0]];
    } else if (!current.squares.includes(null)) {
        status = "Its a draw!";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const newSquares = [...current.squares];
        const newLastMove = [Math.floor(i / 5), i % 5];
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? "X" : "O";

        setHistory(newHistory.concat([{
            squares: newSquares,
            lastMove: newLastMove,
        }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    };

    const toggle = () => {
        setAscend(!ascend);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)} boardSize={5} winner={winner} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button onClick={() => toggle()}>{ascend ? "Ascending" : "Descending"}</button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Game />
    );
};

export default App;