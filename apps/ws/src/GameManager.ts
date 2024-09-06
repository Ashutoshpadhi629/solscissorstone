import { WebSocket } from "ws";
import { Game } from "./Game";
import { Messages } from "./messages";

export class GameManger {
    private games: Game[];
    private players: WebSocket[];
    private pendingPlayer: WebSocket | null;
    constructor(){
        this.games = [];
        this.pendingPlayer = null;
        this.players = [];
    }

    //  Add player
    addUser (socket: WebSocket){
        this.players.push(socket)
        this.addHandler(socket)
    }

    // Remove player with given socket
    removeUser(socket: WebSocket){
        // check if the player left the game in between
        const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
        if(game){
            console.log("user left in between");
            if(game.player1 === socket){
                game.player2.send(
                    JSON.stringify({
                    type: Messages.WIN,
                    message:"Opponent Left the game! You win",
                }));
            }
            else if(game.player2 === socket){
                game.player1.send(
                    JSON.stringify({
                    type: Messages.WIN,
                    message:"Opponent Left the game! You win",
                }));
            }
            this.removeGame(game)
        }
        // Case when the player join the server but didn't enter a game and exit the server
        else
        this.players = this.players.filter((ele) => ele !== socket);
    }

    // Remove game and associated player
    removeGame(game: Game){
        this.games = this.games.filter((ele) => ele.gameId !== game.gameId);
        this.players = this.players.filter((ele) => ele !== game.player1 && ele !== game.player2);
    }

    // Add handlers that listens to events on socket
    addHandler (socket: WebSocket){
        socket.on("message",(data) => {
            const message = JSON.parse(data.toString());
            if(message.type === Messages.INIT_GAME){
                if(this.pendingPlayer){
                    // Make a new game
                    const game = new Game(this.pendingPlayer, socket);
                    this.games.push(game);
                    this.pendingPlayer = null;
                    // send notifications of game begins
                    game.player1.send(
                        JSON.stringify({
                        type: Messages.GAME_START,
                    }));

                    game.player2.send(
                        JSON.stringify({
                        type: Messages.GAME_START,
                    }));
                }
                else {
                    this.pendingPlayer = socket;
                    this.pendingPlayer.send(
                        JSON.stringify({
                        type: Messages.FINDING_GAME,
                    }));
                }
            }

            if(message.type === Messages.MOVE){
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
                if(game){
                    const status = game.handleMove(socket,message.move);
                    if(status){
                        this.removeGame(game);
                    }
                }
            }

        })
    }

}