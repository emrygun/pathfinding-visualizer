import React, {useState, useEffect} from 'react';

import bfs from '../../algorithms/bfs'

import './table.scss'

//Table size
const cols = 40;
const rows = 25;

//Default start and end points
var NODE_START = { x: 0, y: 0 };
var NODE_END = { x: 39, y: 24 }; 

export const Table = ({DrawMode, isRunning, setRunning}) => {
	const [Grid, setGrid] = useState([]);


    const changeCellState = (row, col, state) => {
        document.getElementsByTagName('td')[col + row * cols]
        .setAttribute('id', state)
    }

    const getCellState = (row, col) => {
        return document.getElementsByTagName('td')[col + row * cols]
        .getAttribute('id')
    }

    const clickHandler = (colIndex, rowIndex) => {
        console.log(rowIndex, colIndex);
        switch (DrawMode) {
            case 0:
                if (getCellState(rowIndex, colIndex) === 'WALL') {
                    changeCellState(rowIndex, colIndex, '');
                    Grid[rowIndex][colIndex] = 0;
                }
                else {
                    changeCellState(rowIndex, colIndex, 'WALL');
                    Grid[rowIndex][colIndex] = 1;
                }
                break;
            case 1:
                //Change starting position
                console.log(NODE_START.y, NODE_START.x)
                changeCellState(NODE_START.y, NODE_START.x, '');
                NODE_START = { y: rowIndex, x: colIndex};
                changeCellState(NODE_START.y, NODE_START.x, 'START_POINT');
                break;
            case 2:
                //Change ending position
                changeCellState(NODE_END.y, NODE_END.x, '');
                NODE_END = { y: rowIndex, x: colIndex }
                changeCellState(NODE_END.y, NODE_END.x, 'END_POINT');
                break;
            default:
                break;
        }
    };

    const startSimulation = () => {
        console.log(NODE_START)
        bfs(Grid, NODE_START, NODE_END, {changeCellState})
    }

    //Initializ Grid
    useEffect(() => {
        initializeGrid();
        
    }, []);

	const initializeGrid = () => {
        const grid = new Array(rows);

        for (let i = 0; i < rows; i++)
            grid[i] = new Array(cols);

        for (let i = 0; i < rows; i++)
            for (let j = 0; j < cols; j++)
                grid[i][j] = 0;
        setGrid(grid);
        console.log(grid)
	}

    //Table cell as node 
    const TableWithNodeKeys = (
        <tbody>
            {
                Grid.map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {
                                row.map((col, colIndex) => {
                                    return <td 
                                        colIndex={colIndex} 
                                        rowIndex={rowIndex} 
                                        onClick={() => clickHandler(colIndex, rowIndex)}
                                        />
                                })
                            }
                        </tr>
                        );
                    }
                )
            }
        </tbody>
    )

    

    return (
        <div className="visualizer-table-container">
            <table className="table is-bordered">
                {TableWithNodeKeys}
            </table>
            <button onClick={startSimulation} />
        </div>
    )
        
}
