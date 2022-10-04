import React, { useState } from 'react';
import { calculateWinner } from '../../utils/util';
import Board from '../board/Board';
import './game.css';

const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(25).fill(null), // lưu kết quả trò chơi hiện tại
        lastMove: null, // lưu trữ bước di chuyển hiện tại được chọn theo [row, col]
    }]);
    const [stepNumber, setStepNumber] = useState(0); // lưu bước hiện tại
    const [xIsTurn, setXIsTurn] = useState(true); // lưu trạng thái [X,O]
    const [sortAscend, setSortAscend] = useState(false); // lưu tăng dần hay giảm dần
    const current = history[stepNumber]; // lấy kết quả trò chơi tại nước người chơi chọn quay lại
    const winner = calculateWinner(current.squares); // kiểm tra xem có người thắng cuộc hay chưa

    const renderMoves = history.map((step, move) => {
        if (sortAscend) {
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

    let statusGame;
    if (winner) {
        statusGame = "Winner: " + current.squares[winner[0]];
    } else if (!current.squares.includes(null)) {
        statusGame = "Its a draw!";
    } else {
        statusGame = "Next player: " + (xIsTurn ? "X" : "O");
    }

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const newSquares = [...current.squares];
        const newLastMove = [Math.floor(i / 5), i % 5];
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsTurn ? "X" : "O";

        setHistory(newHistory.concat([{
            squares: newSquares,
            lastMove: newLastMove,
        }]));
        setStepNumber(newHistory.length);
        setXIsTurn(!xIsTurn);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsTurn((step % 2) === 0);
    };

    const toggle = () => {
        setSortAscend(!sortAscend);
    };

    const resetBoard = () => {
        setHistory([{
            squares: Array(25).fill(null), 
            lastMove: null,
        }]);
        setStepNumber(0);
        setXIsTurn(true);
        setSortAscend(false);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)} boardSize={5} winner={winner} />
                <button className="reset-game" onClick={resetBoard}>Reset Game</button>
            </div>
            <div className="game-info">
                <div>{statusGame}</div>
                <button className="status-game" onClick={toggle}>{sortAscend ? "Ascending" : "Descending"}</button>
                <ol>{renderMoves}</ol>
            </div>
        </div>
    );
};

export default Game;
