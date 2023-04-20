import Bowman from "./Characters/Bowman";
import Swordsman from "./Characters/Swordsman";
import Magician from "./Characters/Magician";
import Daemon from "./Characters/Daemon";
import Undead from "./Characters/Undead";
import Vampire from "./Characters/Vampire";
import PositionedCharacter from "./PositionedCharacter";

import { generateTeam } from "./generators";
import themes from "./themes";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);

    const playerChar = [Bowman, Swordsman, Magician];
    const compChar = [Daemon, Undead, Vampire];

    const playerTeam = generateTeam(playerChar, 4, this.gamePlay.boardSize * 2);
    const compTeam = generateTeam(compChar, 4, this.gamePlay.boardSize * 2);

    const positionsPlayer = this.positionsPlayer();
    const positionsComp = this.positionsComputer();

    const positionsTeamPlayers = playerTeam.characters.map(
      (el, index) => new PositionedCharacter(el, positionsPlayer[index])
    );
    const positionsTeamComp = compTeam.characters.map(
      (el, index) => new PositionedCharacter(el, positionsComp[index])
    );
    this.gamePlay.redrawPositions(
      positionsTeamPlayers.concat(positionsTeamComp)
    );
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  positionsPlayer() {
    const positions = [];
    let i = 0;
    while (i < this.gamePlay.boardSize ** 2) {
      positions.push(i);
      positions.push(i + 1);
      i += this.gamePlay.boardSize;
    }
    return positions;
  }

  positionsComputer() {
    const positions = [];
    let i = this.gamePlay.boardSize - 2;
    while (i < this.gamePlay.boardSize ** 2) {
      positions.push(i);
      positions.push(i + 1);
      i += this.gamePlay.boardSize;
    }
    return positions;
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
