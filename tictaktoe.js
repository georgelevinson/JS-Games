var cell1 = {
    htmlReference: document.querySelector("#cell1"),
    valIndex: 0
};
var cell2 = {
    htmlReference: document.querySelector("#cell2"),
    valIndex: 0
};
var cell3 = {
    htmlReference: document.querySelector("#cell3"),
    valIndex: 0
};
var cell4 = {
    htmlReference: document.querySelector("#cell4"),
    valIndex: 0
};
var cell5 = {
    htmlReference: document.querySelector("#cell5"),
    valIndex: 0
};
var cell6 = {
    htmlReference: document.querySelector("#cell6"),
    valIndex: 0
};
var cell7 = {
    htmlReference: document.querySelector("#cell7"),
    valIndex: 0
};
var cell8 = {
    htmlReference: document.querySelector("#cell8"),
    valIndex: 0
};
var cell9 = {
    htmlReference: document.querySelector("#cell9"),
    valIndex: 0
};

const cellsArray = [cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9];
const value = ['X','O',' '];

// cellsArray[arrIndex]['htmlReference'].textContent = value[cellsArray[arrIndex]['valIndex']];

for (let arrIndex = 0; arrIndex < cellsArray.length; arrIndex++) {
    cellsArray[arrIndex]['htmlReference'].addEventListener('click', function(){  
        cellsArray[arrIndex]['htmlReference'].textContent = value[cellsArray[arrIndex]['valIndex']];
        cellsArray[arrIndex]['valIndex'] += 1;
        if (cellsArray[arrIndex]['valIndex'] === 3) {
            cellsArray[arrIndex]['valIndex'] = 0;
        }
    })
}