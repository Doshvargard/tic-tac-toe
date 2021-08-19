import "core-js/stable";
import "regenerator-runtime/runtime";
import view from "./view";
import * as model from "./model";

const controlCurrentPlayer = function (curPlayer) {
  console.log("Hey!");
  if (model.state.currentPlayer) return;
  model.setCurrentPlayer(curPlayer);
  view.rander(model.state);
  view.msgUpdate();
};

const controlView = function (move) {
  if (model.state.gridState[move]) return;
  if (!model.state.currentPlayer) view.renderWarningModal();
  if (!model.state.currentPlayer) return;
  model.setPlayerMoves(move);
  view.rander(model.state);
  model.changeCurrentPlayer();
  view.msgUpdate();
  if (model.state.gameOver) {
    model.setResults();
    view.renderModal(true);
    view.scoreUpdateView();
    view.msgUpdate(true);
  }
  if (!model.state.gameOver && model.state.gameDraw) view.renderModal();
};

const controlResetGame = function () {
  view.initMsg();
  view.hideModal();
  view.hideWinline();
  model.resetState();
};
const init = function () {
  view.addHandlerCurrentPlayer(controlCurrentPlayer);
  view.addHandlerCells(controlView);
  view.addHandlerPlayAgain(controlResetGame);
};

init();
