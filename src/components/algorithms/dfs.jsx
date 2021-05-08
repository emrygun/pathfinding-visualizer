//Sleep function to add delay
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

export default async function dfs(Grid, start, end, {changeCellState, setRunning}) {

    let stack = []
    let current = start;

    const parentOfCell = [];

    Grid[current.y][current.x] = 1;

    stack.push(current)

    while(stack.length > 0) {
        current = stack.pop()

        const neighbors = [
            { x: current.x - 1, y: current.y     },
            { x: current.x,     y: current.y + 1 },
            { x: current.x + 1, y: current.y     },
            { x: current.x,     y: current.y - 1 }
        ]
        
        for (let node of neighbors) {
            //Check for horizantal limits
            if (node.x < 0 || node.x > Grid[0].length - 1)
                continue

            //Check for vertical limits
            if (node.y < 0 || node.y > Grid.length - 1)
                continue
                    
            //Check if wall or visited
            if(Grid[node.y][node.x] === 1)
                continue

            //Create key for current node
            const key = node.y + '.' + node.x
            if (key in parentOfCell)
                continue

            //Keep track of keys to find path
            //DFS is not a pathfinding algorithm so we need to
            //keep track of it
            parentOfCell[key] = {
                key: current.y + '.' + current.x,
                pos: current
            }
                
            //Check if reached to goal
            if(node.x === end.x && node.y === end.y) {
                let path = [];

                let currentKey = current.y + '.' + current.x;

                while (current !== start) {
                    path.push(current)
                    const { key, pos } = parentOfCell[currentKey]
                    current = pos;
                    currentKey = key;
                }

                path.forEach((cell) => {
                    changeCellState(cell.y, cell.x, 'PATH');
                })

                setRunning(false)
                return;
            }

            //Set visited
            Grid[node.y][node.x] = 1;
            changeCellState(node.y, node.x, 'VISITED')
            stack.push(node)
        }

        await sleep(20)
    }
    setRunning(false)
}
