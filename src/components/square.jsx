import { useState } from "react"

function Square({ value, onClick, click }) {
   
    return (
        <button onClick={onClick} className={`square ${click ? 'clicked':''}`}>
           {value}
        </button>
    )
}

export function Board() {
    const [xisNext, setXisNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))
    const[isClicked, setIsClicked] = useState(Array(9).fill(false))

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquare = squares.slice()
        if (xisNext) {
            nextSquare[i] = 'X';
        } else {
            nextSquare[i] = 'O';
        }
        
        setIsClicked((prev)=>{const clickState = [...prev]; clickState[i] = !clickState[i]; return clickState } )
        setXisNext(!xisNext)
        setSquares(nextSquare)
        
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next Player: ' + (xisNext ? 'X' : 'O');
    }

    return (
        <div>
           <h1 className="status">{status}</h1>
            <div className='board-div'>
                <Square click={isClicked[0]} value={squares[0]} onClick={() => handleClick(0)} />
                <Square click={isClicked[1]} value={squares[1]} onClick={() => handleClick(1)} />
                <Square click={isClicked[2]} value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className='board-div' >
                <Square click={isClicked[3]} value={squares[3]} onClick={() => handleClick(3)} />
                <Square click={isClicked[4]} value={squares[4]} onClick={() => handleClick(4)} />
                <Square click={isClicked[5]} value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className='board-div' >
                <Square click={isClicked[6]} value={squares[6]} onClick={() => handleClick(6)} />
                <Square click={isClicked[7]} value={squares[7]} onClick={() => handleClick(7)} />
                <Square click={isClicked[8]} value={squares[8]} onClick={() => handleClick(8)} />
            </div>
        </div>
    )
}

function calculateWinner(square) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (square[a] && square[a] === square[b] && square[a] === square[c]) {
            return square[a];
        }
    }
    return null;
}

