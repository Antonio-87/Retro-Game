export default class GameState {
  constructor(currentPlayer) {
    this.currentPlayer = currentPlayer;
  }
  static from(object) {
    // TODO: create object
    return new GameState(object.currentPlayer);
  }
}
