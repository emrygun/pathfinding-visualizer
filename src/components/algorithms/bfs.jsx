//Sleep function to add delay
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}


export default async function bfs(Grid, start, end, {changeCellState, setRunning}) {
    //Initialize queue and parent of cell 
    let queue = [];
    const parentOfCell = [];

    //Set the start point visited
    Grid[start.y][start.x] = 1

    //Push start point to queue to dequeue it and get it's neighbors
    queue.push(start);

    console.log(Grid.length, Grid[0].length)
    while (queue.length > 0) {
        //Dequeue and get current location
        let current = queue.shift();

        //Neighbor vectors
        const neigbors = [
            { x: current.x - 1, y: current.y     },
            { x: current.x,     y: current.y + 1 },
            { x: current.x + 1, y: current.y     },
            { x: current.x,     y: current.y - 1 }
        ]
        
        //Check if available then push the neigbors to queue
        for (let i = 0; i < neigbors.length; i++) {
            //Get the position of current neighbor
            const nX = neigbors[i].x;
            const nY = neigbors[i].y;

            //Check for horizantal limits
            if (nX < 0 || nX > Grid[0].length - 1)
                continue

            //Check for vertical limits
            if (nY < 0 || nY > Grid.length - 1)
                continue

            //Check if visited or wall
            if (Grid[nY][nX] === 1)
                continue

            //Create key for current location and check
            //if it has been reached
            const key = nY + '.' + nX
            if (key in parentOfCell)
                continue

            //Keep track of parrents to find path
            parentOfCell[key] = {
                key: current.y + '.' + current.x,
                pos: current
            }

            //Reached to goal.
            //Draw the path then and the Simulation
            if (nX === end.x && nY === end.y) {
                let path = [];  //Keep the path here

                let currentKey = current.y + '.' + current.x;

                //Create the path by going reverse
                while (current !== start) {
                    path.push(current);
                    const { key, pos } = parentOfCell[currentKey]
                    current = pos;
                    currentKey = key;
                }

                //Paint the path
                path.forEach((cell) => {
                    changeCellState(cell.y, cell.x, 'PATH')
                })

                setRunning(false);
                return 
            }

            //Set the neighbor visited
            Grid[nY][nX] = 1;

            //Push the neighbor into queue and paint the cell as Visited
            queue.push(neigbors[i]);
            changeCellState(nY, nX, "VISITED")
        }
        await sleep(0.1);
    }
    setRunning(false);
}
