import { randomUUID } from "crypto";
import { WebSocket } from "ws";
import { Messages } from "./messages";
type Moves = "rock" | "paper" | "scissors" | null;


export class Game{
    public gameId: string;
    public player1: WebSocket;
    public player2: WebSocket;
    public player1Points: number;
    public player2Points: number;
    public player1Move: Moves;
    public player2Move: Moves;
    private isCompleted: boolean;
    private round: number;

    constructor(player1: WebSocket, player2: WebSocket){
        this.gameId = randomUUID();
        this.player1 = player1;
        this.player2 = player2;
        this.player1Points = 0;
        this.player2Points = 0;
        this.player1Move = null;
        this.player2Move = null;
        this.isCompleted = false;
        this.round = 0;
    }

    handleMove(socket:WebSocket, move: Moves) {
        if(this.player1 === socket){
            this.player1Move = move      
        }
        else{
            this.player2Move = move;
        }

        if(this.player1Move && this.player2Move){
            this.round = this.round + 1;
            // Update the score of player who wins

            // If the move are same , make this round draw
            if(this.player1Move === this.player2Move){
                this.player1.send(
                    JSON.stringify({
                        type: Messages.ROUND_DRAW,
                        message: "Round Draw"
                    })
                )
                this.player2.send(
                    JSON.stringify({
                        type: Messages.ROUND_DRAW,
                        message: "Round Draw"
                    })
                )
            }
            else if (
                (this.player1Move === 'rock' && this.player2Move === 'scissors') ||
                (this.player1Move === 'scissors' && this.player2Move === 'paper') ||
                (this.player1Move === 'paper' && this.player2Move === 'rock')
              ) {
                this.player1Points++;
              }
              else {
                this.player2Points++;
            }
            //   TODO: handle case if both player submit same moves


            // check which player wins
            if(this.round === 3 && this.player1Points > this.player2Points ){
                this.player1.send(
                    JSON.stringify({
                    type: Messages.WIN,
                    message: "You Win"
                }));
                this.player2.send(
                    JSON.stringify({
                    type: Messages.LOSE,
                    message: "You Lose"
                }));
                // mark the game as finished
                this.isCompleted = true;
            }
            else if(this.round === 3 && this.player2Points > this.player1Points){
                this.player2.send(
                    JSON.stringify({
                    type: Messages.WIN,
                    message: "You Win"
                }));
                this.player1.send(
                    JSON.stringify({
                    type: Messages.LOSE,
                    message: "You Lose"
                }));
                // mark the game as finished
                this.isCompleted = true;
            }
            else if(this.round === 3 && this.player1Points === this.player2Points){
                this.player2.send(
                    JSON.stringify({
                    type: Messages.DRAW,
                    message: "Game Draw"
                }));
                this.player1.send(
                    JSON.stringify({
                    type: Messages.DRAW,
                    message: "Game Draw"
                }));
                // mark the game as finished
                this.isCompleted = true;
            }
            else {
                // Send score to the players for first round and second round
                this.player1.send(
                    JSON.stringify({
                    type: Messages.SCORE,
                    score: {
                        mine: this.player1Points,
                        opponent: this.player2Points,
                        round: this.round,
                    }
                }));
                this.player2.send(
                    JSON.stringify({
                    type: Messages.SCORE,
                    score: {
                        mine: this.player2Points,
                        opponent: this.player1Points,
                        round: this.round,
                    }
                }));
            }


            // clear the moves of player
            this.player1Move = null;
            this.player2Move = null;
        }
        return this.isCompleted;

    }
}