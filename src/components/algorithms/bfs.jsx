import React from 'react';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function bfs(Grid, start, end, {changeCellState}) {
    let queue = [];

    let visited = new Array(Grid.length);
    for (let i = 0; i < Grid[0].length; i++)
        visited[i] = new Array(Grid[0].length);

    Grid[start.y][start.x] = 1

    queue.push(start);
    console.log(start)
    //paint

    while (queue.length > 0) {
        //Dequeue
        const temp = queue.shift();
        console.log(temp)
        const current = Grid[temp.y][temp.x];

        const neigbors = [
            { x: temp.x - 1, y: temp.y     },
            { x: temp.x,     y: temp.y + 1 },
            { x: temp.x + 1, y: temp.y     },
            { x: temp.x,     y: temp.y - 1 }
        ]
        
        //Check if available then push the neigbors to queue
        for (let i = 0; i < neigbors.length; i++) {
            const nX = neigbors[i].x;
            const nY = neigbors[i].y;

            if (nX < 0 || nX > 39)
                continue

            if (nY < 0 || nY > 24)
                continue

            if (Grid[nY][nX] === 1)
                continue

            if (nX === end.x && nY === end.y)
                return

            Grid[nY][nX] = 1;

            queue.push(neigbors[i]);
            changeCellState(nY, nX, "VISITED")
        }
        await sleep(10);
    }
}
