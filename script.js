// Gameboard is the state of the board
// Each square of GameBoard holds a cell
function Gameboard (){
    const rows = 3;
    const columns = 3;
    let board = [];
    
    // for loop creates a 2d array based on rows and columns
    // row 0 is top row
    //column 0 is left most row
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    //Method to get entire board for UI to render
    const getBoard = () => board;

    // Select a cell to put token
    const dropToken = (row, column, player) => {
        if(board[row][column].getValue() === 'O' || board[row][column].getValue() === 'X'){
            console.log('This cell is used'); 
            return false
        } else {
            board[row][column].addToken(player)
            return true
        }
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
        return boardWithCellValues;
      };

      const boardReset = function() {
        board = [];
        for (let i = 0; i < rows; i++) {
          board[i] = [];
          for (let j = 0; j < columns; j++) {
              board[i].push(Cell());
            }
          }
        }
        
        return {getBoard, dropToken, printBoard, boardReset};
}

/*
** A Cell represents one "square" on the board and can have one of
** +: no token is in the square,
** O: Player One's token,
** X: Player 2's token
*/

function Cell() {
    let value = ' ';
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }

  function GameController(
    playerOneName = "PLAYER 1",
    playerTwoName = "PLAYER 2"
  ) {
    const board = Gameboard();
  
    const players = [
      {
        name: playerOneName,
        token: 'O'
      },
      {
        name: playerTwoName,
        token: 'X'
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];     
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };
  
    const playRound = (row, column) => {

      // Drop a token for the current player
      console.log(
        `Dropping ${getActivePlayer().name}'s token into row ${row}, column ${column}...`
      );
      let succeed = board.dropToken(row, column, getActivePlayer().token);
      let gameOver = checkFunc();
      let tie = tieFunc();
      console.log(succeed);
      console.log(gameOver);   
      console.log(tie);   
      if(succeed){
        if(gameOver){
            // console.log('REACHED')
            board.printBoard();
            board.boardReset();
        } else if(tie){
          board.printBoard();
          board.boardReset();
        }
    else {
      checkFunc();
      tieFunc()
      switchPlayerTurn();
    }
  } 
  
       /*This is where we would check for a winner and handle that logic,
          such as a win message. */

        function checkFunc () {     
            for(let i = 0; i < 3; i++){
                //check rows
                if(checkWin(board.getBoard()[i][0], board.getBoard()[i][1], board.getBoard()[i][2])){
                    return true;
                }
            }
            for(let j = 0; j < 3; j++){
                //check columns
                if(checkWin(board.getBoard()[0][j], board.getBoard()[1][j], board.getBoard()[2][j])){
                    return true;
                }
            }
            if(checkWin(board.getBoard()[0][0], board.getBoard()[1][1], board.getBoard()[2][2])){
                return true;
            } else if(checkWin(board.getBoard()[2][0], board.getBoard()[1][1], board.getBoard()[0][2])){
                return true;
            }
            console.log('Checking for win')
            return false;
        }

        function tieFunc() {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (checkTie(board.getBoard()[i][j]), checkTie(board.getBoard()[i][j]), checkTie(board.getBoard()[i][j]), checkTie(board.getBoard()[i][j]), checkTie(board.getBoard()[i][j]), checkTie(board.getBoard()[i][j]), checkTie(board.getBoard()[i][j]), checkTie(board.getBoard()[i][j]), checkTie(board.getBoard()[i][j])) {
              return true;
            }
          }
        }
        console.log('Checking for draw')
        return false
      }
          
            printNewRound();          
    };

    const checkWin = (v1, v2, v3) => {
        // console.log(v1.getValue())
        if(v1.getValue() === getActivePlayer().token && v2.getValue() === getActivePlayer().token && v3.getValue() === getActivePlayer().token){
            console.log(`${activePlayer.name}(${activePlayer.token}) WON`);
            return  true;
        }
    }
    
    const checkTie = (v1, v2, v3, v4, v5, v6, v7, v8, v9) => {
      // console.log(v1.getValue())
      if((v1.getValue() === players.token) && (v2.getValue() === players.token) && (v3.getValue() === players.token) && (v4.getValue() === players.token) && (v5.getValue() === players.token) && (v6.getValue() === players.token) && (v7.getValue() === players.token) && (v8.getValue() === players.token) && (v9.getValue() === players.token)) {
        console.log('It is a draw. Try again');
        return true
      }
    }    

    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      playRound,
      getActivePlayer,
    };
  }
  
  const game = GameController();
  
  /*
  ROWS
  game.playRound(0,2);game.playRound(1,2);game.playRound(0,1);game.playRound(1,1);game.playRound(0,0)

  game.playRound(1,2);game.playRound(0,2);game.playRound(1,1);game.playRound(0,1);game.playRound(1,0)

  game.playRound(2,2);game.playRound(1,2);game.playRound(2,1);game.playRound(1,1);game.playRound(2,0)
  
  COLUMNS
  game.playRound(0,0);game.playRound(1,2);game.playRound(1,0);game.playRound(1,1);game.playRound(2,0)

  game.playRound(0,1);game.playRound(1,2);game.playRound(1,1);game.playRound(2,2);game.playRound(2,1)

  game.playRound(0,2);game.playRound(1,1);game.playRound(1,2);game.playRound(2,1);game.playRound(2,2)

  DIAGONALS
  game.playRound(0,2);game.playRound(1,2);game.playRound(1,1);game.playRound(2,1);game.playRound(2,0)

  game.playRound(0,0);game.playRound(1,2);game.playRound(1,1);game.playRound(2,0);game.playRound(2,2)

  DRAW
  game.playRound(0,0);game.playRound(0,1);game.playRound(0,2);game.playRound(2,0);game.playRound(2,1); game.playRound(2,2);game.playRound(1,0);game.playRound(1,1);game.playRound(1,2)
  */