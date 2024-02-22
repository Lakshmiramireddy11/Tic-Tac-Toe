
const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset-btn');
const newGameBtn = document.querySelector('#newGame'); 
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');
let turno = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetgame = () => {
    turno = true;
    enableBoxes();
    msgContainer.classList.add('hide');
    msg.innerText = ''; // Reset message
    boxes.forEach(box => {
        box.innerText = ''; // Reset box content
        box.disabled = false; // Enable all boxes
        
    });
};

const boxClickHandler = (event) => {
    const box = event.target;
    console.log("box was clicked");
    if (turno) {
        box.innerText = 'o';
        turno = false;
    } else {
        box.innerText = 'x';
        turno = true;
    }
    box.disabled = true;
    checkWinner();
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
    });
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            return;
        }
    }
};

resetBtn.addEventListener('click', resetgame);
newGameBtn.addEventListener('click', resetgame); // Added event listener for "New Game" button


boxes.forEach(box => {
    box.addEventListener('click', boxClickHandler);
});
