import React, {useState, useEffect, useLayoutEffect} from 'react';

import bfs from '../../algorithms/bfs'
import dfs from '../../algorithms/dfs';

import './table.scss'

//Table size
const cols = 40;
const rows = 25;

//Default start and end points
var NODE_START = null
//{ x: 0, y: 0 };
var NODE_END = null 
//{ x: 39, y: 24 }; 

const changeCellState = (row, col, state) => {
    document.getElementsByClassName('cell')[col + row * cols]
    .setAttribute('id', state)
}

const getCellState = (row, col) => {
    return document.getElementsByClassName('cell')[col + row * cols]
    .getAttribute('id')
}

export const Table = () => {
    const [DrawMode, setDrawMode] = useState(0);
    const [Algorithm, setAlgorithm] = useState('Breadth-First Search'); //0 means BFS
    const [isRunning, setRunning] = useState(false);
    const [isClear, setClear]     = useState(true);

	const [Grid, setGrid] = useState([]);

    const clickHandler = (colIndex, rowIndex) => {
        if (isRunning === false) {
            if (!isClear) resetSimulation();

            switch (DrawMode) {
                case 0:
                    if (getCellState(rowIndex, colIndex) === 'WALL') {
                        changeCellState(rowIndex, colIndex, '');
                        Grid[rowIndex][colIndex] = 0;
                    }
                    break;
                case 1:
                    changeCellState(rowIndex, colIndex, 'WALL');
                    Grid[rowIndex][colIndex] = 1;
                    break;
                case 2:
                    //Change starting position
                    try{ changeCellState(NODE_START.y, NODE_START.x, ''); } catch{}
                    NODE_START = { y: rowIndex, x: colIndex};
                    changeCellState(NODE_START.y, NODE_START.x, 'START_POINT');
                    break;
                case 3:
                    //Change ending position
                    try{ changeCellState(NODE_END.y, NODE_END.x, ''); } catch{}
                    NODE_END = { y: rowIndex, x: colIndex }
                    changeCellState(NODE_END.y, NODE_END.x, 'END_POINT');
                    break;
                default:
                    break;
            }
        }
    };

    const startSimulation = () => {
        if (NODE_START === null || NODE_END === null) {
            window.alert("Please set Start and Goal nodes.")
            return 
        }

        setClear(false)
        setRunning(true)

        //Holding strings in state is not a good practice
        //Find a better way
        switch (Algorithm) {
            case "Breadth-First Search":
                bfs(Grid, NODE_START, NODE_END, {changeCellState, setRunning});
                break;
            case "Depth-First Search":
                dfs(Grid, NODE_START, NODE_END, {changeCellState, setRunning});
                break;
            default: break;
        }
    }

    const clearSimulation = () => {
        //Clear Grid
        if (!isRunning) {
            initializeGrid();
            NODE_START = null;
            NODE_END = null;

            for (let i = 0; i < rows; i++){
                for (let j = 0; j < cols; j++){
                    changeCellState(i, j, '');
                }
            } 
            setClear(true)
        }
    }

    const resetSimulation = () => {
        //Reset Grid
        if (!isRunning) {
            for (let i = 0; i < rows; i++){
                for (let j = 0; j < cols; j++){
                    if (getCellState(i, j) !== 'START_POINT' &&
                        getCellState(i, j) !== 'END_POINT'   &&
                        getCellState(i, j) !== 'WALL') {
                        changeCellState(i, j, '');
                        Grid[i][j] = 0;
                        }
                }
            } 
            setClear(true)
        }
    }

    //Select cells
    let cell = document.getElementsByClassName("cell");
    for ( var i = 0; i < cell.length; i++ ) (function(i){
      cell[i].onmousemove = function(e) {
          if(e.buttons === 1){
            console.log(cell[i].getAttribute('colIndex'), cell[i].getAttribute('rowIndex'))
            clickHandler(parseInt(cell[i].getAttribute('colIndex')),
                        parseInt(cell[i].getAttribute('rowIndex')))
            }
          }
    })(i);

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
        <div className="gridTable">
            {
                Grid.map((row, rowIndex) => {
                    return (
                            row.map((col, colIndex) => {
                                return <div 
                                    className="cell" 
                                    colIndex={colIndex} 
                                    rowIndex={rowIndex} 
                                    />
                            })
                        );
                    }
                )
            }
        </div>
    )

    //Initializ Grid
    useEffect(() => {
        initializeGrid();
    }, []);

    const returnAlgoName = () => {
        switch (Algorithm) {
            case 0: return "Breadth-First Search"
            case 1: return "Depth-First Search"
            default: return null;
        }
    } 

    return (
    <div className="main-container">
        <div className="visualizer-container">
            <div className="pathfinder box block column">
                <div className="visualizer-table-container">
                    <div className="options-container">
                        <DrawModeSelect 
                            setDrawMode={setDrawMode}
                            startSimulation={startSimulation}
                            resetSimulation={resetSimulation}
                            clearSimulation={clearSimulation}
                            Algorithm={Algorithm}
                            setAlgorithm={setAlgorithm}
                            returnAlgoName={returnAlgoName}
                        />
                    </div>
                    {TableWithNodeKeys}
                </div>
            </div>
        </div>
        <footer class="footer-container">
            <p>
                Github: <a href="https://github.com/emrygun">@emrygun</a>. Powered by Bulma and React JS.
            </p>
        </footer>
    </div>
    )
}

const DrawModeSelect = ({setDrawMode, startSimulation, resetSimulation, clearSimulation, Algorithm, setAlgorithm, returnAlgoName}) => {
    return (
      <div className="DrawModeSelect-container columns">
        <div className="buttons column">
          <button
            class="button is-small is-success is-outlined"
            onClick={() => setDrawMode(2)}
          ><span className="icon is-small"><i class="fa fa-home" aria-hidden="true"/></span>
            <span>Start</span>
          </button>
          <button
            class="button is-small is-danger is-outlined"
            onClick={() => setDrawMode(3)}
          ><span className="icon is-small"><i class="fa fa-flag" aria-hidden="true"/></span>
            <span>Goal</span>
          </button>
          <button
            class="button is-small is-dark is-outlined"
            onClick={() => setDrawMode(1)}
            ><span className="icon is-small"><i class="fa fa-plus" aria-hidden="true"/></span>
            <span>Add Wall</span>
          </button>
          <button
            class="button is-small is-dark is-outlined"
            onClick={() => setDrawMode(0)}
          ><span className="icon is-small"><i class="fa fa-minus" aria-hidden="true"/></span>
            <span>Delete Wall</span>
          </button>
        </div>
        <div class="is-divider-vertical" data-content="OR"></div>
        <div className="buttons column">
          <button
            class="button is-small is-dark is-outlined"
            onClick={startSimulation}
          >
            <span className="icon is-small">
              <i className="fas fa-play" aria-hidden="true"></i>
            </span>
            <span>Run</span>
          </button>
          <button
            class="button is-small is-dark is-outlined"
            onClick={resetSimulation}
          >
            <span className="icon is-small">
              <i className="fas fa-step-backward" aria-hidden="true"></i>
            </span>
            <span>Reset</span>
          </button>
          <button
            class="button is-small is-dark is-outlined"
            onClick={clearSimulation}
          >
            <span className="icon is-small">
              <i className="fas fa-stop" aria-hidden="true"></i>
            </span>
            <span>Clear</span>
          </button>
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button
                className="button AlgoDropdownButton is-small is-dark is-outlined"
                aria-haspopup="true"
                aria-controls="dropdown-menu4"
              >
                  <span className="text">{Algorithm}</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
              <div className="dropdown-content">
                    <span class="dropdown-item" onClick={() => setAlgorithm('Breadth-First Search')}>
                        <span className="text">Breadth-First Search</span>
                      <span className="icon is-small">
                      {(Algorithm === 'Breadth-First Search' ?  <i className="fas fa-check" aria-hidden="true"/>: null)}
                </span>
                  </span>
                </div>
                <div className="dropdown-content" onClick={() => setAlgorithm('Depth-First Search')}>
                  <span className="dropdown-item">
                  <span className="text">Depth-First Search</span>
                      <span className="icon is-small">
                      {(Algorithm === 'Depth-First Search' ?  <i className="fas fa-check" aria-hidden="true"/>: null)}
                </span>
                  </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
}

