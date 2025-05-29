 var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

//fonts
const font = new FontFace('Simple Stacked', 'url(SimpleStacked-9MAKn.ttf)');
font.load().then(function(loadedFont) {
  document.fonts.add(loadedFont);
  document.body.style.fontFamily = 'Simple Stacked';
});




// Graph configurations
var graphConfigs = {
    complete: {
    name: "Complete Graph K15",
    minColors: 15,
    nodes: [
        { x: 600, y: 300 }, { x: 550, y: 400 }, { x: 460, y: 470 },
        { x: 350, y: 500 }, { x: 240, y: 470 }, { x: 150, y: 400 },
        { x: 100, y: 300 }, { x: 150, y: 200 }, { x: 240, y: 130 },
        { x: 350, y: 100 }, { x: 460, y: 130 }, { x: 550, y: 200 },
        { x: 370, y: 230 }, { x: 330, y: 370 }, { x: 410, y: 370 }
    ],
    edges: [
        [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],
        [1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],[1,11],[1,12],[1,13],[1,14],
        [2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],[2,11],[2,12],[2,13],[2,14],
        [3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11],[3,12],[3,13],[3,14],
        [4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11],[4,12],[4,13],[4,14],
        [5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[5,12],[5,13],[5,14],
        [6,7],[6,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],
        [7,8],[7,9],[7,10],[7,11],[7,12],[7,13],[7,14],
        [8,9],[8,10],[8,11],[8,12],[8,13],[8,14],
        [9,10],[9,11],[9,12],[9,13],[9,14],
        [10,11],[10,12],[10,13],[10,14],
        [11,12],[11,13],[11,14],
        [12,13],[12,14],
        [13,14]
    ],
    adjacencyList: [
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
        [0,2,3,4,5,6,7,8,9,10,11,12,13,14],
        [0,1,3,4,5,6,7,8,9,10,11,12,13,14],
        [0,1,2,4,5,6,7,8,9,10,11,12,13,14],
        [0,1,2,3,5,6,7,8,9,10,11,12,13,14],
        [0,1,2,3,4,6,7,8,9,10,11,12,13,14],
        [0,1,2,3,4,5,7,8,9,10,11,12,13,14],
        [0,1,2,3,4,5,6,8,9,10,11,12,13,14],
        [0,1,2,3,4,5,6,7,9,10,11,12,13,14],
        [0,1,2,3,4,5,6,7,8,10,11,12,13,14],
        [0,1,2,3,4,5,6,7,8,9,11,12,13,14],
        [0,1,2,3,4,5,6,7,8,9,10,12,13,14],
        [0,1,2,3,4,5,6,7,8,9,10,11,13,14],
        [0,1,2,3,4,5,6,7,8,9,10,11,12,14],
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
    ]
}
,
    planar: {
    name: "Planar Graph",
    minColors: 4,
    nodes: [
        { x: 100, y: 100 }, { x: 200, y: 100 }, { x: 300, y: 100 }, { x: 400, y: 100 }, { x: 500, y: 100 },
        { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 300, y: 200 }, { x: 400, y: 200 }, { x: 500, y: 200 },
        { x: 100, y: 300 }, { x: 200, y: 300 }, { x: 300, y: 300 }, { x: 400, y: 300 }, { x: 500, y: 300 },
        { x: 100, y: 400 }, { x: 200, y: 400 }, { x: 300, y: 400 }, { x: 400, y: 400 }, { x: 500, y: 400 }
    ],
    edges: [
        // Horizontal edges
        [0,1],[1,2],[2,3],[3,4],
        [5,6],[6,7],[7,8],[8,9],
        [10,11],[11,12],[12,13],[13,14],
        [15,16],[16,17],[17,18],[18,19],
        // Vertical edges
        [0,5],[5,10],[10,15],
        [1,6],[6,11],[11,16],
        [2,7],[7,12],[12,17],
        [3,8],[8,13],[13,18],
        [4,9],[9,14],[14,19],
        // Some diagonals for added connectivity (still planar)
        [1,7],[6,12],[11,17],[2,8],[7,13],[12,18],
        [3,9],[8,14],[13,19]
    ],
    adjacencyList: [
        [1,5],           // 0
        [0,2,6,7],       // 1
        [1,3,7,8],       // 2
        [2,4,8,9],       // 3
        [3,9],           // 4
        [0,6,10],        // 5
        [1,5,7,11],      // 6
        [1,2,6,8,12],    // 7
        [2,3,7,9,13],    // 8
        [3,4,8,14],      // 9
        [5,11,15],       // 10
        [6,10,12,16],    // 11
        [7,11,13,17],    // 12
        [8,12,14,18],    // 13
        [9,13,19],       // 14
        [10,16],         // 15
        [11,15,17],      // 16
        [12,16,18],      // 17
        [13,17,19],      // 18
        [14,18]          // 19
    ]
}
,
    bipartite: {
    name: "Bipartite Graph",
    minColors: 2,
    nodes: [
        // Left partition (0–4)
        { x: 200, y: 150 }, { x: 200, y: 250 }, { x: 200, y: 350 }, { x: 200, y: 450 }, { x: 200, y: 550 },
        // Right partition (5–9)
        { x: 600, y: 150 }, { x: 600, y: 250 }, { x: 600, y: 350 }, { x: 600, y: 450 }, { x: 600, y: 550 }
    ],
    edges: [
        [0,5],[0,6],[0,7],[0,8],[0,9],
        [1,5],[1,6],[1,7],[1,8],[1,9],
        [2,5],[2,6],[2,7],[2,8],[2,9],
        [3,5],[3,6],[3,7],[3,8],[3,9],
        [4,5],[4,6],[4,7],[4,8],[4,9]
    ],
    adjacencyList: [
        [5,6,7,8,9], // Node 0
        [5,6,7,8,9], // Node 1
        [5,6,7,8,9], // Node 2
        [5,6,7,8,9], // Node 3
        [5,6,7,8,9], // Node 4
        [0,1,2,3,4], // Node 5
        [0,1,2,3,4], // Node 6
        [0,1,2,3,4], // Node 7
        [0,1,2,3,4], // Node 8
        [0,1,2,3,4]  // Node 9
    ]
},
    random: {
    name: "Random Graph",
    minColors: 3,
    nodes: [
        { x: 150, y: 100 }, // 0
        { x: 300, y: 80 },  // 1
        { x: 450, y: 120 }, // 2
        { x: 550, y: 250 }, // 3
        { x: 500, y: 400 }, // 4
        { x: 350, y: 450 }, // 5
        { x: 200, y: 400 }, // 6
        { x: 100, y: 250 }, // 7
        { x: 250, y: 250 }, // 8
        { x: 400, y: 250 }  // 9
    ],
    edges: [
        [0,1],[0,7],[0,8],
        [1,2],[1,8],
        [2,3],[2,9],
        [3,4],[3,9],
        [4,5],
        [5,6],[5,9],
        [6,7],[6,8],
        [7,8],
        [8,9]
    ],
    adjacencyList: [
        [1,7,8],    // 0
        [0,2,8],    // 1
        [1,3,9],    // 2
        [2,4,9],    // 3
        [3,5],      // 4
        [4,6,9],    // 5
        [5,7,8],    // 6
        [0,6,8],    // 7
        [0,1,6,7,9],// 8
        [2,3,5,8]   // 9
    ]
}
};

// Current game state
var currentGraphType = 'complete';
var currentGraph = graphConfigs[currentGraphType];
var once_submit = false;
var clicks = [];
var moves = 0;
var last_clicked = -1;
var result;
var which_colors_used = [true, false, false, false, false, false, false, 
    false, false,false,false,false,false,false,false,false];
var no_of_colors_used = 0;

// Initialize game
function initializeGame() {
    currentGraph = graphConfigs[currentGraphType];
    clicks = new Array(currentGraph.nodes.length).fill(0);
    moves = 0;
    last_clicked = -1;
    once_submit = false;
    which_colors_used = [true, false, false, false, false, false, false, 
    false, false,false,false,false,false,false,false,false];
    no_of_colors_used = 0;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the selected graph
    drawGraph();
    drawUI();
}

// Function to change graph type
function changeGraphType() {
    var select = document.getElementById('graph_type');
    currentGraphType = select.value;
    initializeGame();
}

// Function to draw a circle
function draw_circle(x, y, i, click) {
    var radius = 30;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 7);
    
    if (click == 0)
        ctx.fillStyle = "#000000";  //black
    else if (click == 1)
        ctx.fillStyle = "#8BC34A";  //green
    else if (click == 2)
        ctx.fillStyle = "red";      //red
    else if (click == 3)
        ctx.fillStyle = "blue";     //blue
    else if (click == 4)
        ctx.fillStyle = "#4DB6AC";  //light blue
    else if (click == 5)
        ctx.fillStyle = "#FF4081";  //pink
    else if (click == 6)
        ctx.fillStyle = "#EA80FC";  //purple
    else if (click == 7)
        ctx.fillStyle = "#FFA726";  //orange
    else if (click == 8)
        ctx.fillStyle = "#76FF03";  //light green
    else if (click == 9)
        ctx.fillStyle = "yellow";
    else if (click == 10)
        ctx.fillStyle = "#BDB76B"; //khaki
    else if (click == 11)
        ctx.fillStyle = "#9370DB"; //medium purple
    else if (click == 12)
        ctx.fillStyle = "#708090"; //slate grey
    else if (click == 13)
        ctx.fillStyle = "#663399"; //rebecca purple
    else if (click == 14)
        ctx.fillStyle = "#008080"; //teal
    else if (click == 15)
        ctx.fillStyle = "#FF6347"; //tomato
    
    ctx.fill();
    
    // to write node number
    ctx.font = '20pt "Simple Stacked"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(i, x, y);
}

// Function to draw edges
function draw_line(sx, sy, dx, dy) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(dx, dy);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Function to draw the current graph
function drawGraph() {
    // Draw edges
    for (var i = 0; i < currentGraph.edges.length; i++) {
        var edge = currentGraph.edges[i];
        var fromNode = currentGraph.nodes[edge[0]];
        var toNode = currentGraph.nodes[edge[1]];
        draw_line(fromNode.x, fromNode.y, toNode.x, toNode.y);
    }
    
    // Draw nodes
    for (var i = 0; i < currentGraph.nodes.length; i++) {
        draw_circle(currentGraph.nodes[i].x, currentGraph.nodes[i].y, i, clicks[i]);
    }
}

// Function to draw UI elements
function drawUI() {
    // Draw submit button
    var answer = { x: 1250, y: 1110, w: 160, h: 50 };
    var cornerRadius = 20;
    
    ctx.lineJoin = "round";
    ctx.lineWidth = cornerRadius;
    ctx.fillStyle = "rgba(0,200,0,1)";
    ctx.strokeStyle = "rgba(0,200,0,1)";
    
    ctx.strokeRect(answer.x + (cornerRadius / 2), answer.y + (cornerRadius / 2), answer.w - cornerRadius, answer.h - cornerRadius);
    ctx.fillRect(answer.x + (cornerRadius / 2), answer.y + (cornerRadius / 2), answer.w - cornerRadius, answer.h - cornerRadius);
    
    ctx.font = '40pt "Simple Stacked"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Submit", 1325, 1150);
    
    // Draw color guide
    var colorGuide = [
        { color: "#8BC34A", text: "1 click" },
        { color: "red", text: "2 clicks" },
        { color: "blue", text: "3 clicks" },
        { color: "#4DB6AC", text: "4 clicks" },
        { color: "#FF4081", text: "5 clicks" },
        { color: "#EA80FC", text: "6 clicks" },
        { color: "#FFA726", text: "7 clicks" },
        { color: "#76FF03", text: "8 clicks" },
        { color: "yellow", text: "9 clicks" },
        { color: "#BDB76B", text: "10 clicks" },
        { color: "#9370DB", text: "11 clicks" },
        { color: "#708090", text: "12 clicks" },
        { color: "#663399", text: "13 clicks" },
        { color: "#008080", text: "14 clicks" },
        { color: "#FF6347", text: "15 clicks" }
    ];
    
    for (var i = 0; i < colorGuide.length; i++) {
        var y = 210 + (i * 55);
        ctx.fillStyle = colorGuide[i].color;
        ctx.fillRect(1280, y, 40, 40);
        ctx.fillStyle = "white";
        ctx.font = 'bold 30pt "Simple Stacked"';
        ctx.fillText(colorGuide[i].text, 1385, y + 25);
    }
    
    // Draw moves counter
    ctx.fillStyle = 'rgb(104, 160, 40)';
    ctx.fillRect(1200, 1030, 450, 50);
    ctx.fillStyle = 'black';
    ctx.font = '40px "Simple Stacked"';
    ctx.fillText("No of moves : " + moves, 1350, 1065);
    
    // Draw graph info
    ctx.fillStyle = 'white';
    ctx.font = '50px "Simple Stacked"';
    ctx.fillText("Graph: " + currentGraph.name, 300, 640);
    ctx.fillText("Minimum Colors Needed: " + currentGraph.minColors, 300, 680);
    console.log(ctx.font);
}

// Validation function
function validateSolution() {
    var isValid = true;
    var uncoloredNodes = [];
    var conflictingPairs = [];
    
    // Check for uncolored nodes
    for (var i = 0; i < clicks.length; i++) {
        if (clicks[i] === 0) {
            uncoloredNodes.push(i);
            isValid = false;
        }
    }
    
    // Check for adjacent nodes with same color
    for (var i = 0; i < currentGraph.adjacencyList.length; i++) {
        var nodeColor = clicks[i];
        if (nodeColor === 0) continue; // Skip uncolored nodes
        
        for (var j = 0; j < currentGraph.adjacencyList[i].length; j++) {
            var adjacentNode = currentGraph.adjacencyList[i][j];
            var adjacentColor = clicks[adjacentNode];
            
            if (nodeColor === adjacentColor && nodeColor !== 0) {
                conflictingPairs.push([i, adjacentNode]);
                isValid = false;
            }
        }
    }
    
    return {
        isValid: isValid,
        uncoloredNodes: uncoloredNodes,
        conflictingPairs: conflictingPairs
    };
}

// Submit function
function submit_box() {
    var j, i, color_state, flag = 0;
    once_submit = true;
    
    // Redraw submit button in different color
    ctx.lineJoin = "round";
    ctx.lineWidth = 20;
    ctx.fillStyle = "#CCFF90";
    ctx.strokeStyle = "#CCFF90";
    ctx.strokeRect(1250 + 10, 1110 + 10, 160 - 20, 50 - 20);
    ctx.fillRect(1250 + 10, 1110 + 10, 160 - 20, 50 - 20);
    ctx.font = '25pt "Simple Stacked"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText("Submit", 1325, 1150);
    
    // Count colors used
    no_of_colors_used = 0;
    which_colors_used = [true, false, false, false, false, false, false, 
    false, false,false,false,false,false,false,false,false];
    
    for (j = 0; j < clicks.length; j++) {
        if (clicks[j] > 0 && which_colors_used[clicks[j]] == false) {
            which_colors_used[clicks[j]] = true;
            no_of_colors_used++;
        }
    }
    
    // Validate solution
    var validation = validateSolution();
var playerName = document.getElementById('team_name').value.trim() || "Player";

if (validation.isValid) {
    result = "correct";

    var message = ` ${playerName.toUpperCase()} WON! \n`;
    message += "Colors used: " + no_of_colors_used + "\n";
    message += "Moves: " + moves + "\n";

    if (no_of_colors_used === currentGraph.minColors) {
        message += "Perfect! You used the minimum number of colors!";
    } else {
        message += "Good job! (Minimum possible: " + currentGraph.minColors + " colors)";
    }

    alert(message);
} else {
    result = "incorrect";

    var message = `${playerName.toUpperCase()}, YOU LOST!\n`;

    if (validation.uncoloredNodes.length > 0) {
        message += "Uncolored nodes: " + validation.uncoloredNodes.join(", ") + "\n";
    }

    if (validation.conflictingPairs.length > 0) {
        message += "Adjacent nodes with same color found!\n";
    }

    message += "Try again!";
    alert(message);
}

    var team = document.getElementById('team_name').value;
    var arr = {
        "team": team,
        "moves": moves,
        "solution": result,
        "no_of_colors": no_of_colors_used,
        "clicks": clicks,
        "graph_type": currentGraphType
    };
    
    // Uncomment the line below if you have a backend to handle submissions
    // $.post("graph_coloring.php", arr, function(data) { alert(team + "\nYour answer is Submitted"); });
}

// Function to get position and handle clicks
function getPosition(event) {
    if (event.x != undefined && event.y != undefined) {
        var rect = canvas.getBoundingClientRect();
        var x = event.x - rect.left;
        var y = event.y - rect.top;
        
        var radius = 30;
        var answer = { x: 1250, y: 1110, w: 160, h: 50 };
        
        // Check if submit button was clicked
        if (x >= answer.x && x <= answer.x + answer.w && y >= answer.y && y <= answer.y + answer.h) {
            if (once_submit == false) {
                submit_box();
            }
            return;
        }
        
        // Check if game is still active
        if (once_submit == false) {
            // Check which node was clicked
            for (var j = 0; j < currentGraph.nodes.length; j++) {
                var node = currentGraph.nodes[j];
                var distance = Math.sqrt((x - node.x) * (x - node.x) + (y - node.y) * (y - node.y));
                
                if (distance <= radius) {
                    if (j != last_clicked) {
                        moves++;
                        last_clicked = j;
                    }
                    
                    // Cycle through colors
                    clicks[j] = (clicks[j] + 1) % 16;
                    
                    // Redraw the graph
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawGraph();
                    drawUI();
                    break;
                }
            }
        }
    }
}

// Timer function
function countdown(minutes) {
    let seconds = 60;
    let mins = minutes;

    function tick() {
        let current_minutes = mins - 1;
        seconds--;

        // Clear the previous timer area
        ctx.clearRect(1250, 110, 600, 100);

        // Set style based on time left
        if (current_minutes < 5) {
            ctx.fillStyle = "#FF4C4C"; // Red background for urgency
        } else {
            // Gradient background
            const gradient = ctx.createLinearGradient(1050, 50, 1650, 150);
            gradient.addColorStop(0, "#FFD700");
            gradient.addColorStop(1, "#FFA500");
            ctx.fillStyle = gradient;
        }

        // Draw flashy rounded rectangle (simulate with filled rect and stroke)
        ctx.beginPath();
        ctx.moveTo(1060, 60);
        ctx.lineTo(1640, 60);
        ctx.lineTo(1640, 130);
        ctx.lineTo(1060, 130);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Timer text
        let string = current_minutes.toString() + " mins " + (seconds < 10 ? "0" : "") + seconds + " secs";
        ctx.fillStyle = current_minutes < 5 ? "white" : "black";
        ctx.font = 'italic 32pt "Simple Stacked", sans-serif';
        ctx.fillText("⏳ Time Left: " + string, 1250, 110);

        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            if (mins > 1) {
                countdown(mins - 1);
            } else {
                submit_box();
            }
        }
    }

    tick();
}


// Event listener
canvas.addEventListener("mousedown", getPosition, false);

// Initialize the game
initializeGame();

// Start timer
countdown(10);
       
//onload function
window.onload = () => {
    document.fonts.ready.then(() => {
        initializeGame();
    });
};
