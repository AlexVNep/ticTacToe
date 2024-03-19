// Gameboard is the state of the board
// Each square of GameBoard holds a cell
function Gameboard (){
    const rows = 3;
    const columns = 3;
    const board = [];
    
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

      return {getBoard, dropToken, printBoard};
}

/*
** A Cell represents one "square" on the board and can have one of
** +: no token is in the square,
** O: Player One's token,
** X: Player 2's token
*/

function Cell() {
    let value = '+';
  
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
      console.log(succeed)
      if(succeed){
        switchPlayerTurn();
      } 
  
       /*This is where we would check for a winner and handle that logic,
          such as a win message. */
          const boardWithCellValues = board.printBoard();

          if(checkFunc(boardWithCellValues, activePlayer)){
            console.log(`${activePlayer.name}(${activePlayer.token}) WON`);
          }        

      printNewRound();
    };

    const checkWin = (v1, v2, v3) => {
        if(v1 === getActivePlayer().token && v2 === getActivePlayer().token && v3 === getActivePlayer().token){
            console.log('I got to here')
        }
    }

    function checkFunc () {        
        for(let i = 0; i < 3; i++){
            //check rows
            if(checkWin(board.getBoard()[i][0], board.getBoard()[i][1], board.getBoard()[i][2])){
                console.log('I was checked')
                return true;
            }
        }
        for(let j = 0; j < 3; j++){
            //check columns
            if(checkWin(board.getBoard()[0][j], board.getBoard()[1][j], board.getBoard()[2][j])){
                return true;
            }
        }
        if(checkWin([board.getBoard()[0, 0], board.getBoard()[1, 1], board.getBoard()[2, 2] ])){
            return true;
        } else if(checkWin([board.getBoard()[2,0], board.getBoard()[1,1], board.getBoard()[0,2]])){
            return true;
        }
        return false;
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