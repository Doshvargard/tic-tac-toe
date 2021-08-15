import O from "../img/O.png";
import X from "../img/X.png";
class view {
  _data;
  _parentEl = document.querySelector("#grid");
  winLine = document.querySelector(".winline");
  modalWindow = document.querySelector(".modal");
  modalWarningWindow = document.querySelector(".modal__warning");
  allCells = document.querySelectorAll(".grid_cell");
  _oScore = document.querySelector(".o__score");
  _xScore = document.querySelector(".x__score");
  _playerSelector = document.querySelector(".results");
  _msg = document.querySelector(".message_text");
  rander(data) {
    this._data = data;
    this.gridUpdate();
  }

  msgUpdate(clearMsg = false) {
    if (clearMsg) this._msg.style.opacity = "0";
    if (this._data.currentPlayer === "x" && !clearMsg)
      this._msg.innerHTML = "It's X turn!";
    if (this._data.currentPlayer === "o" && !clearMsg)
      this._msg.innerHTML = "It's O turn!";
  }

  initMsg() {
    this._msg.innerHTML = "Please choose your Player X or O !";
    this._msg.style.opacity = "1";
  }
  scoreUpdateView() {
    this._xScore.innerHTML = this._data.xScore;
    this._oScore.innerHTML = this._data.oScore;
  }

  gridUpdate() {
    const targetCell = document.querySelector(`.cell--${this._data.cellId}`);
    const markUp = `<img class="img " src=${
      this._data.currentPlayer === "o" ? O : X
    } alt="" />`;
    if (!targetCell) return;
    targetCell.insertAdjacentHTML("afterbegin", markUp);
  }

  renderModal(winner = false) {
    if (this._data.gameOver)
      this.winLine.classList.add(this._data.winLineClass);
    const modalMarkUp = `<h1 class="modal__caption">
      ${
        winner
          ? `PLAYER
      <img src=${
        this._data.playerWinner === "o" ? O : X
      } alt="" class="result--img modal__img" /> WON!`
          : `DRAW!`
      } 
    </h1>
    <a href="" class="modal__btn"><h3 class="btn__text">Play again!</h3></a>
    <p class="modal_text">© Copyright by Hossein Doshvargard</p>
    `;
    this.modalWindow.innerHTML = "";
    this.modalWindow.insertAdjacentHTML("afterbegin", modalMarkUp);
    this.modalWindow.classList.remove("hide");
  }

  renderWelcomeModal() {}

  renderWarningModal() {
    this.modalWarningWindow.classList.remove("hide");
    setTimeout(() => {
      this.modalWarningWindow.classList.add("hide");
    }, 3000);
  }

  hideModal() {
    this.modalWindow.classList.add("hide");
    setTimeout(() => {
      this.modalWindow.innerHTML = "";
    }, 3000);
  }

  hideWinline() {
    this.winLine.classList.add("hide");
    setTimeout(() => {
      this.winLine.classList.remove(this._data.winLineClass);
      this.winLine.classList.remove("hide");
    }, 1000);
  }
  addHandlerCells(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const cell = e.target.closest(".grid_cell");
      if (!cell) return;
      const cellId = +cell.dataset.number;
      handler(cellId);
    });
  }

  addHandlerPlayAgain(handler) {
    this.modalWindow.addEventListener("click", (e) => {
      e.preventDefault();
      const resetBtn = e.target.closest(".modal__btn");
      if (!resetBtn) return;
      handler();
      this.modalWindow.classList.add("hide");
      this.allCells.forEach((cell) => cell.classList.add("hide"));
      setTimeout(() => {
        this.allCells.forEach((cell) => (cell.innerHTML = ""));
        this.allCells.forEach((cell) => cell.classList.remove("hide"));
      }, 1000);
    });
  }

  addHandlerCurrentPlayer(handler) {
    this._playerSelector.addEventListener("click", function (e) {
      const playerBtn = e.target.closest(".result--img");
      const curPlayer = playerBtn.dataset.player;
      handler(curPlayer);
    });
  }
}

export default new view();
