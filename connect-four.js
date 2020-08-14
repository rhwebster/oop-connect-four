import { Game } from './game.js';

let game = undefined;

function updateUI(){
    let boardHolder = document.getElementById("board-holder");
    let gameName = document.getElementById("game-name");

    if(game === undefined){
        boardHolder.classList.add("is-invisible");
    } else {
        boardHolder.classList.remove("is-invisible");
        gameName.innerHTML = game.getName();

        for(let i = 0; i <= 6; i++){
            let columnEl = document.getElementById(`column-${i}`);
            let isColumnFull = game.isColumnFull(i)
            if (isColumnFull){
                columnEl.classList.add('full');
            } else {
                columnEl.classList.remove('full');
            }
        }

        for (let rowIndex = 0; rowIndex <= 5; rowIndex++) {
            for (let columnIndex = 0; columnIndex <= 6; columnIndex++) {
                let square = document.querySelector(`#square-${rowIndex}-${columnIndex}`);
                square.innerHTML = '';

                let playerNumber = game.getTokenAt(rowIndex, columnIndex);
                if (playerNumber === 1) {
                    let token = document.createElement('div');
                    token.classList.add('token');
                    token.classList.add('black');
                    square.appendChild(token);
                } else if (playerNumber === 2) {
                    let token = document.createElement('div');
                    token.classList.add('token');
                    token.classList.add('red');
                    square.appendChild(token);
                }
            }

        }

        let currentPlayer = game.currentPlayer;
        let clickTarget = document.getElementById('click-targets');
        if (currentPlayer === 1) {
            clickTarget.classList.add('black');
            clickTarget.classList.remove('red');
        } else {
            clickTarget.classList.add('red');
            clickTarget.classList.remove('black');
        }

    }
}

window.addEventListener('DOMContentLoaded', () => {

    let player1 = document.getElementById('player-1-name');
    let player2 = document.getElementById('player-2-name');
    let newGameButton = document.getElementById('new-game');
    // console.log(player1Content)
    // console.log(player2Content)


    let enableButton = () => {
        let player1Content = player1.value;
        let player2Content = player2.value;
        newGameButton.disabled = player1Content.length === 0 || player2Content.length === 0;
    }


    player1
        .addEventListener('keyup', () => {
            enableButton();
    })
    player2
        .addEventListener('keyup', () => {
            enableButton();
    })

    newGameButton.addEventListener('click', () => {
        game = new Game(player1.value, player2.value);
        player1.value = "";
        player2.value = "";
        enableButton();
        updateUI();
    })

    document.getElementById('click-targets').addEventListener('click', event => {
        let targetId = event.target.id;
        console.log(targetId)
        if (!targetId.startsWith('column-')) return;

        let columnIndex = Number.parseInt(targetId[targetId.length -1 ]);
        game.playInColumn(columnIndex);
        updateUI();
        console.log(game.columns)
    })
});
