export class Game {
    // player 1 will be black, player 2 red
        constructor(playerOneName, playerTwoName) {
            this.playerOneName = playerOneName;
            this.playerTwoName = playerTwoName;
        }

        getName(){
            return `${this.playerOneName} vs ${this.playerTwoName}`;
        }
    }
