import { Column } from './column.js';
import { ColumnWinInspector } from './column-win-inspector.js';
import { RowWinInspector } from './row-win-inspector.js';
import { DiagonalWinInspector } from './diagonal-win-inspector.js';

export class Game {
    // player 1 will be black, player 2 red
        constructor(playerOneName, playerTwoName) {
            this.playerOneName = playerOneName;
            this.playerTwoName = playerTwoName;
            this.currentPlayer = 1;
            this.columns = [new Column(),
                            new Column(),
                            new Column(),
                            new Column(),
                            new Column(),
                            new Column(),
                            new Column()];
            this.winnerNumber = 0;
        }

        checkForColumnWin() {
            if(this.winnerNumber !== 0){
                return;
            } else {
                for(let columnIndex = 0 ; columnIndex < this.columns.length; columnIndex ++){
                    let column = this.columns[columnIndex]
                    let inspector = new ColumnWinInspector(column);
                    let  winningNumber = inspector.inspect();
                    if(winningNumber === 1 || winningNumber === 2){
                        this.winnerNumber = winningNumber;
                    }
                }
            }

        }

        checkForRowWin() {
            if (this.winnerNumber !== 0) {
                return;
            } else {
                for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
                    let columns = this.columns.slice(columnIndex, columnIndex + 4);
                    let inspector = new RowWinInspector(columns);
                    let winningNumber = inspector.inspect();
                    if(winningNumber === 1 || winningNumber === 2){
                        this.winnerNumber = winningNumber;
                    }
                }
            }
        }

        checkForDiagonalWin() {
            if (this.winnerNumber !== 0) {
                return;
            } else {
                for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
                    let columns = this.columns.slice(columnIndex, columnIndex + 4);
                    let inspector = new DiagonalWinInspector(columns);
                    let winningNumber = inspector.inspect();

                    if(winningNumber === 1 || winningNumber === 2){
                        this.winnerNumber = winningNumber;
                        return;
                    }
                }
            }
        }


        checkForTie() {
            if (this.columns.every(columnIndex => columnIndex.isFull())) {
                this.winnerNumber = 3;
                console.log(`Tie suckers!`)
            };
        }


        getName() {
            if (this.winnerNumber === 1) {
                return `${this.playerOneName} WINS!!`
            }
            if (this.winnerNumber === 2) {
                return `${this.playerTwoName} WINS!!`
            }
            if (this.winnerNumber === 3) {
                return `${this.playerOneName} ties with ${this.playerTwoName}`
            }
            return `${this.playerOneName} vs ${this.playerTwoName}`;
        }

        getTokenAt(rowIndex, columnIndex) {
            return this.columns[columnIndex].getTokenAt(rowIndex);
        }

        isColumnFull(columnIndex){
            if (this.winnerNumber === 1 || this.winnerNumber === 2 ) {
                return true;
            }
            return this.columns[columnIndex].isFull()
        }

        playInColumn(columnIndex) {
            this.columns[columnIndex].add(this.currentPlayer);
            this.checkForTie();
            this.checkForColumnWin();
            this.checkForRowWin();
            this.checkForDiagonalWin();

            if (this.currentPlayer === 1) {
                this.currentPlayer = 2;
            } else {
                this.currentPlayer = 1;
            }
        }

    }
