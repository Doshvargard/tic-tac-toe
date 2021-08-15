export const state = {
  winConditions: [
    [1, 5, 9, "deg-45"],
    [3, 5, 7, "deg45"],
    [1, 2, 3, "htop"],
    [4, 5, 6, "hmiddle"],
    [7, 8, 9, "hbottom"],
    [1, 4, 7, "vleft"],
    [9, 6, 3, "vright"],
    [2, 5, 8, "vmiddle"],
  ],
  currentPlayer: "",
  gridState: {},
  playerWinner: "",
  gameOver: false,
  gameDraw: false,
  oScore: 0,
  xScore: 0,
};

export const setCurrentPlayer = function (curPlayer) {
  state.currentPlayer = curPlayer;
};

export const setPlayerMoves = function (move) {
  console.log(state.currentPlayer);
  if (state.gridState[move]) return;
  state.cellId = move;
  state.gridState[move] = state.currentPlayer;
  console.log(state.gridState);
  givePlayerWinner();
};

export const changeCurrentPlayer = function () {
  if (state.currentPlayer === "o") {
    state.currentPlayer = "x";
  } else {
    state.currentPlayer = "o";
  }
};
const givePlayerWinner = function () {
  state.winConditions.forEach((condition) => {
    const firstCell = state.gridState[condition[0]];
    const secondCell = state.gridState[condition[1]];
    const thirdCell = state.gridState[condition[2]];
    if (
      firstCell &&
      secondCell &&
      thirdCell &&
      firstCell === secondCell &&
      secondCell === thirdCell
    ) {
      state.playerWinner = state.currentPlayer;
      state.gameOver = true;
      state.winLineClass = condition[3];
      console.log(`${state.playerWinner} Won!`);
    }
  });
  if (Object.entries(state.gridState).length === 9 && !state.gameOver)
    state.gameDraw = true;
};

export const setResults = function () {
  if (!state.playerWinner) return;
  if (state.playerWinner === "x") state.xScore++;
  if (state.playerWinner === "o") state.oScore++;
};

export const resetState = function () {
  state.gridState = {};
  state.gameDraw = false;
  state.gameOver = false;
  state.currentPlayer = "";
  state.cellId = "";
};
