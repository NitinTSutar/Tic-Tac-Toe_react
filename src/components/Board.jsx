import React, { useState } from "react";

export const Board = () => {
    const calculateWinner = (bigBox) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 2, 8],
            [2, 4, 6],
        ];
        const winner = lines
            .map(([a, b, c]) => {
                if (
                    bigBox[a] &&
                    bigBox[a] === bigBox[b] &&
                    bigBox[a] === bigBox[c]
                ) {
                    return bigBox[a];
                }
                return null;
            })
            .find((result) => result);
        return winner || null;
    };

    const [bigBox, setBigBox] = useState(Array(9).fill(null));
    const [isXnext, setIsXnext] = useState(true);
    const winner = calculateWinner(bigBox);
    const isDraw = !winner && bigBox.every((cell) => cell !== null);

    const handleClick = (index) => {
        if (bigBox[index] || winner) return;
        const newBoard = [...bigBox];
        newBoard[index] = isXnext ? "❌" : "⭕";
        setBigBox(newBoard);
        setIsXnext(!isXnext);
    };

    const restartGame = () => {
        setBigBox(Array(9).fill(null));
        setIsXnext(true);
    };

    return (
        <div className="text-white flex flex-col h-dvh justify-center relative items-center align-middle">
            <h3 className="mb-5 bg-black px-5 py-2 rounded-xl">Tic-Tac-Toe</h3>
            <div className="text-white grid grid-cols-3 gap-1">
                {bigBox.map((cell, index) => (
                    <button
                        className="h-24 w-24 bg-[#0f3460] border-2 border-solid border-[#444] text-[2rem] font-bold cursor-pointer flex justify-center items-center hover:bg-[#16213e]"
                        onClick={() => handleClick(index)}
                        key={index}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            {winner && (
                <p className="text-2xl text-amber-300 mt-2.5">
                    Winner : {winner}
                </p>
            )}
            {isDraw && (
                <p className="" onClick={restartGame}>
                    Restart Game
                </p>
            )}

            <button
                className="bg-red-500 px-4 py-2 mt-5 border-none rounded-xl cursor-pointer hover:bg-red-400"
                onClick={restartGame}
            >
                Restart Game
            </button>
        </div>
    );
};
