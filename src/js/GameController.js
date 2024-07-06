import Bowman from "./Characters/Bowman";
import Swordsman from "./Characters/Swordsman";
import Magician from "./Characters/Magician";
import Daemon from "./Characters/Daemon";
import Undead from "./Characters/Undead";
import Vampire from "./Characters/Vampire";
import PositionedCharacter from "./PositionedCharacter";

import { generateTeam } from "./generators";
import themes from "./themes";
import GamePlay from "./GamePlay";
import checkMove from "./checkMove";
import checkAttack from "./checkAttack";
import GameState from "./GameState";

export default class GameController {
  #positionTeamList;
  #activeCharacter;
  #positionsPlayer;
  #positionsComp;
  #gameState;
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.#positionTeamList;
    this.#positionsPlayer;
    this.#positionsComp;
    this.#gameState;

    this.#activeCharacter = null;
    this.selected = null;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);

    const playerChar = [Bowman, Swordsman, Magician];
    const compChar = [Daemon, Undead, Vampire];

    const playerTeam = generateTeam(playerChar, 4, 2);
    const compTeam = generateTeam(compChar, 4, 2);

    this.#positionsPlayer = this.positionsPlayer(2);
    this.#positionsComp = this.positionsComputer(2);

    const positionsTeamPlayers = playerTeam.characters.map(
      (el, index) => new PositionedCharacter(el, this.#positionsPlayer[index])
    );
    const positionsTeamComp = compTeam.characters.map(
      (el, index) => new PositionedCharacter(el, this.#positionsComp[index])
    );

    this.#positionTeamList = [...positionsTeamPlayers, ...positionsTeamComp];
    this.gamePlay.redrawPositions(this.#positionTeamList);
    // TODO: add event listeners to gamePlay events
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    // TODO: load saved stated from stateService
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  positionsPlayer(count) {
    const positions = [];
    let positionsRandom = new Set([]);

    let i = 0;
    while (i < this.gamePlay.boardSize ** 2) {
      positions.push(i);
      positions.push(i + 1);
      i += this.gamePlay.boardSize;
    }
    for (let i = 0; i <= count; i++) {
      positionsRandom.add(
        positions[Math.floor(Math.random() * positions.length)]
      );
    }
    return [...positionsRandom];
  }

  positionsComputer(count) {
    const positions = [];
    let positionsRandom = new Set([]);
    let i = this.gamePlay.boardSize - 2;
    while (i < this.gamePlay.boardSize ** 2) {
      positions.push(i);
      positions.push(i + 1);
      i += this.gamePlay.boardSize;
    }
    for (let i = 0; i <= count; i++) {
      positionsRandom.add(
        positions[Math.floor(Math.random() * positions.length)]
      );
    }
    return [...positionsRandom];
  }

  async onCellClick(index) {
    // TODO: react to click
    const cellPlayer = this.#positionsPlayer.find((el) => el === index);
    const cellComp = this.#positionsComp.find((el) => el === index);
    const green =
      this.gamePlay.cells[index].classList.contains("selected-green");
    const red = this.gamePlay.cells[index].classList.contains("selected-red");
    if (cellPlayer) {
      if (this.#activeCharacter)
        this.gamePlay.deselectCell(this.#activeCharacter);
      this.gamePlay.selectCell(index);
      this.#activeCharacter = index;
    }
    if (cellComp && !red) {
      if (this.#activeCharacter)
        this.gamePlay.deselectCell(this.#activeCharacter);
      this.#activeCharacter = null;
      this.gamePlay.setCursor("auto");
      GamePlay.showError(`No character or it is an enemy character!`);
    }

    if (!cellComp && !cellPlayer && this.#activeCharacter && green) {
      const activCharacter = this.#positionTeamList.find(
        (el) => el.position === this.#activeCharacter
      );
      const activeIndex = this.#positionsPlayer.indexOf(this.#activeCharacter);
      this.#positionsPlayer[activeIndex] = index;
      activCharacter.position = index;
      this.gamePlay.redrawPositions(this.#positionTeamList);
      this.gamePlay.deselectCell(this.#activeCharacter);
      this.gamePlay.deselectCell(this.selected);
      this.#activeCharacter = null;
      this.#gameState = GameState.from({ currentPlayer: "player" });
    }
    if (!cellPlayer && this.#activeCharacter && red) {
      const attacker = this.#positionTeamList.find(
        (el) => el.position === this.#activeCharacter
      ).character;
      const target = this.#positionTeamList.find(
        (el) => el.position === index
      ).character;
      this.#attack(attacker, target, index);
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const cell = this.#positionTeamList.find((el) => el.position === index);
    const player = this.#positionsPlayer.find((el) => el === index);
    const comp = this.#positionsComp.find((el) => el === index);
    let character;
    if (cell) {
      character = cell.character;
    }
    if (character) {
      const message = this.#getCharacterInfo(character);
      this.gamePlay.showCellTooltip(message, index);
    }
    if (this.#activeCharacter) {
      if (this.#activeCharacter !== index && player) {
        this.gamePlay.setCursor("pointer");
      }
      if (this.#activeCharacter !== index) {
        if (this.selected && this.selected !== this.#activeCharacter) {
          this.gamePlay.deselectCell(this.selected);
          this.gamePlay.setCursor("auto");
        }
        const activCharacter = this.#positionTeamList.find(
          (el) => el.position === this.#activeCharacter
        );
        const youCanGo = checkMove(
          activCharacter.character.type,
          this.#activeCharacter,
          index,
          this.gamePlay.boardSize
        );
        const youCanAttack = checkAttack(
          activCharacter.character.type,
          this.#activeCharacter,
          index,
          this.gamePlay.boardSize
        );
        if (youCanGo === true && !cell) {
          this.gamePlay.setCursor("pointer");
          this.gamePlay.selectCell(index, "green");
          this.selected = index;
        }
        if (youCanAttack === true && cell && comp) {
          this.gamePlay.setCursor("crosshair");
          this.gamePlay.selectCell(index, "red");
          this.selected = index;
        }
        if (comp && youCanAttack === false) {
          this.gamePlay.setCursor("not-allowed");
          this.selected = index;
        }
      }
    } else {
      if (this.selected) this.gamePlay.deselectCell(this.selected);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }

  #getCharacterInfo(character) {
    return `🎖${character.level} ⚔️${character.attack} 🛡${character.defence} ❤️${character.health}`;
  }

  async #attack(attacker, target, indexTarget) {
    const damage = Math.max(
      attacker.attack - target.defence,
      attacker.attack * 0.1
    );
    await this.gamePlay.showDamage(indexTarget, damage);
    if (target.health > 0) {
      target.health = target.health - damage;
      this.gamePlay.redrawPositions(this.#positionTeamList);
    }
    if (target.health - damage < 0) {
      const activeIndexComp = this.#positionsComp.indexOf(indexTarget);
      const activeIndexPlayer = this.#positionsPlayer.indexOf(indexTarget);
      if (activeIndexComp !== -1) {
        this.#positionsComp.splice(activeIndexComp, 1);
        this.#gameState = GameState.from({ currentPlayer: "player" });
      } else {
        this.#positionsPlayer.splice(activeIndexPlayer, 1);
        this.#gameState = GameState.from({ currentPlayer: "computer" });
      }
      const activeIndexObject = this.#positionTeamList.indexOf(
        this.#positionTeamList.find((el) => el.position === indexTarget)
      );
      this.gamePlay.cells[indexTarget].querySelector(".character").remove();
      this.#positionTeamList.splice(activeIndexObject, 1);
      this.gamePlay.redrawPositions(this.#positionTeamList);
    }
    this.gamePlay.deselectCell(this.#activeCharacter);
    this.gamePlay.deselectCell(this.selected);
    this.#activeCharacter = null;
  }
}
