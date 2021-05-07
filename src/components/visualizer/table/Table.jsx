import React, {useState, useEffect} from 'react';

import './table.scss'

const cols = 40;
const rows = 25;


export const Table = ({DrawMode}) => {
	const [Grid, setGrid] = useState([]);

    let NODE_START_ROW = 0;
    let NODE_START_COL = 0;

    let NODE_END_ROW = 999; //fix it 
    let NODE_END_COL = 0;


    const clickHandler = (rowIndex, colIndex) => {
        console.log(rowIndex, colIndex);
        switch (DrawMode) {
            case 0:
                if (document.getElementsByTagName('td')[rowIndex + colIndex * cols]
                .getAttribute('id') === 'WALL')
                    document.getElementsByTagName('td')[rowIndex + colIndex * cols]
                    .setAttribute('id', '')
                else
                    document.getElementsByTagName('td')[rowIndex + colIndex * cols]
                    .setAttribute('id', 'WALL')
                break;
            case 1:
                //Change starting position
                document.getElementsByTagName('td')[NODE_START_ROW + NODE_START_COL * cols]
                .setAttribute('id', '')
                NODE_START_COL = colIndex;
                NODE_START_ROW = rowIndex;
                document.getElementsByTagName('td')[NODE_START_ROW + NODE_START_COL * cols]
                .setAttribute('id', 'START_POINT')
                break;
            case 2:
                //Change ending position
                document.getElementsByTagName('td')[NODE_END_ROW + NODE_END_COL * cols]
                .setAttribute('id', '')
                NODE_END_COL = colIndex;
                NODE_END_ROW = rowIndex;
                document.getElementsByTagName('td')[NODE_END_ROW + NODE_END_COL * cols]
                .setAttribute('id', 'END_POINT')
                break;
            default:
                break;
        }
    };

    //Initializ Grid
    useEffect(() => {
        initializeGrid();
        
        try {
        //Start Point
        document.getElementsByTagName('td')[0]
        .setAttribute('id', 'START_POINT')

        //Start Point
        document.getElementsByTagName('td')[rows * cols - 1]
        .setAttribute('id', 'END_POINT')
        } catch {}
    }, []);

	const initializeGrid = () => {
        const grid = new Array(rows);

        for (let i = 0; i < rows; i++)
            grid[i] = new Array(cols);

        createSpot(grid);
        setGrid(grid);
	}

    const createSpot = (grid) => {
        for (let i = 0; i < rows; i++)
            for (let j = 0; j < cols; j++)
                grid[i][j] = new Spot(i, j);
    }

    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === NODE_START_COL && this.y === NODE_START_ROW;
        this.isEnd   = this.x === NODE_END_COL && this.y === NODE_END_ROW;
        this.g = 0;
        this.f = 0;
        this.h = 0;
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
        </div>
    )
        
}
