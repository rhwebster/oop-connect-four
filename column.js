export class Column {
    constructor(){
        this.tokens = [null, null, null, null, null, null];
    }

    add(playerNumber){
        for(let i = 5; i >= 0; i -= 1){
            if(this.tokens[i] === null){
                // console.log(this.tokens[i]);
                this.tokens[i] = playerNumber;
                return;
            }
        }
    }

    getTokenAt(rowIndex){
        return this.tokens[rowIndex]
    }
    isFull(){
        return this.tokens[0] !== null
    }
 }
