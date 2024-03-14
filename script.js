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
        if(!board[row][column].getValue()) board[row][column].addToken(player)
        console.log(board[row][column].addToken(player))
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
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
    playerOneName = "Alex",
    playerTwoName = "Jess"
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
      board.dropToken(row, column, getActivePlayer().token);
  
      /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
  
      // Switch player turn
      switchPlayerTurn();
      printNewRound();
    };
  
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      playRound,
      getActivePlayer
    };
  }
  
  const game = GameController();
  