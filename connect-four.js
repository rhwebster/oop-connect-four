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

// class Column {

// }

// put a token in a square
});
