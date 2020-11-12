// Creating cells list and assigning class 'neutral' to every cell in the field;
// Assigning corresponding .column classes to cells;

var cells = $('span');
for (let i = 0; i < cells.length; i++) {
    cells.eq(i).addClass('neutral');
}
for (let i = 0; i < 7; i++) {
    for (let nestedIndex = i; nestedIndex < cells.length; nestedIndex += 7) {
        cells.eq(nestedIndex).addClass('column'+i);
    }
}

// Creating user the basic interface (player names inputs and move indication);

var player1 = prompt("Please enter first player's name.");
var player2 = prompt("Please enter second player's name.");

$('h3').text("It's " + player1 + "'s move!");

// Creating click event

// Iterates through each element in cells array, assigning an event listener to it;
// Upon being activated EL pushes the for loop index (corresponding to the index of the cell that has been triggered) to the clickLog;
// Then the column that the triggered cell belongs to is calculated (colIndex);
// Creating moveIndex var to count moves;

var clickLog = [];
var moveLogRed = [];
var moveLogBlue = [];
var moveIndex = 0;

for (let i = 0; i < cells.length; i++) {
    cells.eq(i).click(function(){
        clickLog.push(i);
        colIndex = i%7;
        getCell();
        moveIndex = moveLogBlue.length + moveLogRed.length;
        if (moveIndex%2 === 0) {
            $('h3').text("It's " + player1 + "'s move!");
        } else {
            $('h3').text("It's " + player2 + "'s move!");
        }
        console.log('clickLog updated, last clicked cell id = '+i)
    });
}

// getCell() iterates through the indexed column from bottom up searching for the first classless cell;
// A class is then assigned (changing its colour) according to the moveIndex;
// Cell's postion in cells array is calculated and pushed to the corresponding moveLog;

// Column full bug!

function getCell() {
    i = 5;
    while (1===1) {
        if (i === -1) {
            alert('all cells are occupied!');
            break;
        } else if ($('.column'+colIndex).eq(i).hasClass('red') || $('.column'+colIndex).eq(i).hasClass('blue')) {
            i -= 1;
            console.log('cell occupied!');
        }else if (moveIndex%2 === 0) {
            $('.column'+colIndex).eq(i).addClass('red');
            moveLogRed.push(colIndex + i*7);
            // console.log('moveLog updated, last move was to cell '+(colIndex + i*7));
            // console.log('cell is red!');
            check();
            break;
        }else if (moveIndex%2 === 1) {
            $('.column'+colIndex).eq(i).addClass('blue');
            moveLogBlue.push(colIndex + i*7);
            // console.log('moveLog updated, last move was to cell '+(colIndex + i*7));
            // console.log('cell is blue!');
            check();
            break;
        }
    }
} 

// prog array contains all possible winning cell combinations as arrays;

var prog = [];

// Horisontal winning combinations

for (let outerIndex = 0; outerIndex < 6*7; outerIndex += 7) {
    for (let i = outerIndex; i % 7 < 4; i++) {
        var prog1 = [];
        for (let nestedIndex = i; nestedIndex < i+4; nestedIndex++) {
            prog1.push(nestedIndex);
        }
        prog.push(prog1);
    }
}

// Vertical winning combinations

for (let outerIndex = 0; outerIndex < 7*3; outerIndex += 7) {
    for (let i = outerIndex; i < outerIndex + 7; i++) {
        var prog7 = [];
        for (let nestedIndex = i; nestedIndex < i+4*7; nestedIndex += 7) {
            prog7.push(nestedIndex);
        }
        prog.push(prog7);
    }
}

// Diagonal winnig combinations (L to R desc.)

for (let outerIndex = 0; outerIndex < 3*7; outerIndex += 7) {
    for (let i = outerIndex; i % 7 < 4; i++) {
        var prog8 = [];
        for (let nestedIndex = i; nestedIndex < i+4*8; nestedIndex += 8) {
            prog8.push(nestedIndex);
        }
        prog.push(prog8);
    }
}

// Diagonal winnig combinations (L to R asc.)

for (let outerIndex = 6; outerIndex < 3*7; outerIndex += 7) {
    for (let i = outerIndex; i % 7 > 2; i--) {
        var prog6 = [];
        for (let nestedIndex = i; nestedIndex < i+4*6; nestedIndex += 6) {
            prog6.push(nestedIndex);
        }
        prog.push(prog6);
    }
}

// check function compares moveLogs to the prog array and alerts user if either moveLog contains a winning combination

function check() {
    for (let i = 0; i < prog.length; i++) {
        let commonRed = 0;
        let commonBlue = 0;
        let nestedIndex = 0;
        while (nestedIndex < 4) {
            if (moveLogRed.includes(prog[i][nestedIndex])) {
                commonRed++;
                // console.log(prog[i][nestedIndex]+'is the '+nestedIndex+"'s cell in prog "+i+", and it's captured by Red");
            } else if (moveLogBlue.includes(prog[i][nestedIndex])) {
                commonBlue++;
                // console.log(prog[i][nestedIndex]+'is the '+nestedIndex+"'s cell in prog "+i+", and it's captured by Blue");
            } else {
                // console.log(prog[i][nestedIndex]+'is the '+nestedIndex+"'s cell in prog "+i+", and it hasn't been captured yet");
            }
            if (commonRed === 4) {
                alert(player1+' has won!');
                restartGame();
                return 'red';
            } else if (commonBlue === 4) {
                alert(player2+' has won!');
                restartGame();
                return 'blue';
            } else {
                // return null;
            }
            nestedIndex++;
            // console.log('nestedIndex updated to be '+nestedIndex)
        }
        // console.log(commonBlue, commonRed);
        // for (let nestedIndex = 0; nestedIndex < 4; nestedIndex++) {
        // }
    }
} 

function restartGame() {
    for (let i = 0; i < moveLogRed.length; i++) {
        cells.eq(moveLogRed[i]).removeClass('red');
    }
    for (let i = 0; i < moveLogBlue.length; i++) {
        cells.eq(moveLogBlue[i]).removeClass('blue');
    }
    clickLog = [];
    moveLogRed = [];
    moveLogBlue = [];
    moveIndex = 0;
    player1 = prompt("Please enter first player's name.");
    player2 = prompt("Please enter second player's name.");
}
// -------------------------------------------------------------------------------|-------------------------------------------------------------------------------|