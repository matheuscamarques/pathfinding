class Spot {
    value = 0;
    i = null;
    j = null;
    f = 0;
    g = 0;
    h = 0;
    neighbors = [];
    anterior = undefined;
    wall = false;
}

function distancia(a, b) {
    let value = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
    return value;
}

function heuristica(spot, inicio, fim) {
    // custo do inicio ao atual
    spot.g = Math.round(distancia(spot, inicio));
    spot.h = Math.round(distancia(spot, fim));
    //custo inicial até o atual
    spot.f = spot.g + spot.h;
}

function addNeighbors(spot, grid, m, n) {
    let i = spot.i;
    let j = spot.j;
    let cols = n;
    let rows = m;
    if (i < cols - 1) {
        spot.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
        spot.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
        spot.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
        spot.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
        spot.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
        spot.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
        spot.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
        spot.neighbors.push(grid[i + 1][j + 1]);
    }//console.log(grid[i][j - 1])
}



function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


//------------------------------INICIO DO PROGRAMA---------------------------
//inicializacao
var m = 80, n = 40;

var grid = new Array(n);
for (let i = 0; i < n; i++) {
    grid[i] = new Array(m);
}

console.log("Antes", grid);

for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
        grid[i][j] = new Spot();
        grid[i][j].i = i;
        grid[i][j].j = j;
        grid[i][j].value = '0';
        let ramdom = getRandomArbitrary(0, 10);
        if (ramdom < 2) {
            grid[i][j].value = '#';
            grid[i][j].wall = true;
        }

        //addNeighbors(grid[i][j],grid,m,n);

    }
}

let start = grid[getRandomArbitrary(0, n - 1)][getRandomArbitrary(0, m - 1)];
let end = grid[getRandomArbitrary(0, n - 1)][getRandomArbitrary(0, m - 1)];


for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
        addNeighbors(grid[i][j], grid, m, n);
        //heuristica(grid[i][j], start, end)
    }
}
console.log("Depois", grid);

function compare(a, b) {
    if (a.f > b.f) {
        return -1;
    }
    if (a.f < b.f) {
        return 1;
    }
    return 0;
}

function removeFromArray(arr = [], elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}


function heuristic(a, b) {
    var d = Math.round(distancia(a, b));
    return d;
}

//logica 

let pilhaAberta = [];
let pilhaFechada = [];
let PathFind = [];
pilhaAberta.push(start);

console.log(grid);
drawGrid();
let stop = 0;
let anterior = null;
let interval = setInterval(() => {
    drawGrid();


    if (pilhaAberta.length > 0) {

        var winner = 0;
        for (var i = 0; i < pilhaAberta.length; i++) {
            if (pilhaAberta[i].f < pilhaAberta[winner].f) {
                winner = i;
            }
        }
        var current = pilhaAberta[winner];

        if (current === end) {
            //noLoop();
            PathFind = [];
            var temp = current;
            PathFind.push(temp);
            while (temp.previous) {
                PathFind.push(temp.previous);
                temp = temp.previous;
                printPathFindFinding();
            }
            console.log("DONE!");

            //printPathFindFinding()

            stop = true;
        }


        removeFromArray(pilhaAberta, current);
        pilhaFechada.push(current);

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!pilhaFechada.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + heuristic(neighbor, current);

                var newPathFind = false;
                if (pilhaAberta.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPathFind = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPathFind = true;
                    pilhaAberta.push(neighbor);
                }

                if (newPathFind) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }

        }
        // we can keep going
    } else {
        console.log('no solution');
        clearInterval(interval);
        // no solution
    }

    for (let i = 0; i < pilhaAberta.length; i++) {
        pilhaAberta[i].value = '1';
    }

    for (let i = 0; i < pilhaFechada.length; i++) {
        pilhaFechada[i].value = '2';
    }



    if (stop) {
        for (let i = 0; i < pilhaAberta.length; i++) {
            pilhaAberta[i].value = '#';
        }
        for (let i = 0; i < pilhaFechada.length; i++) {
            pilhaFechada[i].value = '#';
        }
        for (let i = 0; i < PathFind.length; i++) {
            PathFind[i].value = '*';
        }
        drawGrid();

        clearInterval(interval);
    }


}, 0);

//print
function drawGrid() {
    let m = 10;
    var e = document.getElementById("content");

    let barra_n = "<br>";
    let content = "";


    //Pesos
    {
        var b = document.getElementById("grid");
        content = "";
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                content = content + " " + grid[i][j].value + " ";
            }
            content = content + barra_n;
        }
        b.innerHTML = content;
    }
    //pilhaAberta
    {
        e = document.getElementById("pilhaAberta")
        content = '';
        for (let i = 0; i < pilhaAberta.length; i++) {
            content = "<p>" + `[${pilhaAberta[i].i}][${pilhaAberta[i].j}]` + "</p>" + content;
        }
        e.innerHTML = content;
    }
    //pilhaFechada
    {
        e = document.getElementById("pilhaFechada")
        content = '';
        for (let i = 0; i < pilhaFechada.length; i++) {
            content = "<p>" + `[${pilhaFechada[i].i}][${pilhaFechada[i].j}]` + "</p>" + content;
        }
        e.innerHTML = content;
    }





}


function printPathFindFinding() {
    {
        e = document.getElementById("pathfindContent")
        content = '';

        for (let i = 0; i < PathFind.length; i++) {
            content = content + "<p>" + `[${PathFind[i].i}][${PathFind[i].j}]` + "</p>";
        }


        e.innerHTML = content;


    }
}