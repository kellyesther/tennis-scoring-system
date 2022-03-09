export class Match {
  player1: { name: string; points: number; gamePoints: number };
  player2: { name: string; points: number; gamePoints: number };

  constructor(player1: string, player2: string) {
    this.player1 = { name: player1, points: 0, gamePoints: 0 };
    this.player2 = { name: player2, points: 0, gamePoints: 0 };
  }

  tieBreak = false;

  /**
   * Translate a point to corresponding score value
   **/
  private convertPoints(point: number) {
    const scores = {
      0: 0,
      1: 15,
      2: 30,
      3: 40,
    } as {
      [key: number]: number;
    };
    return scores[point];
  }

  private deuce() {
    return (
      this.player1.points >= 3 && this.player2.points === this.player1.points
    );
  }

  /**
   * Check for advantage
   * If both players have at least 3 points and a player has one more than the opponent, that player has 'Advantage'
   */
  private advantage() {
    if (
      this.player1.points >= 3 &&
      this.player1.points === this.player2.points + 1
    ) {
      return true;
    }
    if (
      this.player2.points >= 3 &&
      this.player2.points === this.player1.points + 1
    ) {
      return true;
    }
    return false;
  }

  /**
   * Return game winner by comparing who has a higher point
   */
  private gameWinner() {
    //
    if (this.player1.points > this.player2.points) {
      return this.player1.name;
    }
    return this.player2.name;
  }

  /**
   * Return set winner by comparing who has a higher game point
   */
  private setWinner() {
    if (this.player1.gamePoints > this.player2.gamePoints) {
      return this.player1.name;
    }
    return this.player2.name;
  }

  /**
   * Reset points to zero for starting a new game
   */
  private resetPoints() {
    this.player1.points = 0;
    this.player2.points = 0;
  }

  /**
   * check if game ends based on players points and including event of tiebreak
   */
  private gameEnded() {
    if (!this.tieBreak) {
      if (
        this.player1.points >= 4 &&
        this.player1.points - this.player2.points >= 2
      ) {
        return true;
      }
      if (
        this.player2.points >= 4 &&
        this.player2.points - this.player1.points >= 2
      ) {
        return true;
      }
    }

    if (
      this.player1.points >= 7 &&
      this.player1.points - this.player2.points >= 2
    ) {
      return true;
    }
    if (
      this.player2.points >= 7 &&
      this.player2.points - this.player1.points >= 2
    ) {
      return true;
    }
    return false;
  }

  /**
   * check how a set is finished including tiebreak event
   */
  private setWon() {
    if (
      this.player1.gamePoints === 6 &&
      this.player1.gamePoints === this.player2.gamePoints
    ) {
      this.tieBreak = true;
    }
    if (
      this.player1.gamePoints >= 6 &&
      this.player1.gamePoints - this.player2.gamePoints >= 2
    ) {
      return true;
    }
    if (
      this.player2.gamePoints >= 6 &&
      this.player2.gamePoints - this.player1.gamePoints >= 2
    ) {
      return true;
    }

    if (this.player1.gamePoints === 7 || this.player2.gamePoints === 7) {
      return true;
    }

    return false;
  }

  /**
   * Checks which player won the point and increament their point
   */
  pointWonBy(player: string) {
    if (player === this.player1.name) {
      this.player1.points += 1;
    } else if (player === this.player2.name) {
      this.player2.points += 1;
    }
  }

  /**
   * Returns current match result.
   * Results have different format for different situation i.e set won, deuce, advantage, a game won, tiebreak or running game
   */
  score() {
    if (this.setWon()) {
      return "Winner of tennis match is " + `${this.setWinner()}`;
    }
    if (this.gameEnded()) {
      if (this.gameWinner() === this.player1.name) {
        this.player1.gamePoints += 1;
        this.resetPoints();
      } else if (this.gameWinner() === this.player2.name) {
        this.player2.gamePoints += 1;
        this.resetPoints();
      }
      return `${this.player1.gamePoints}-` + `${this.player2.gamePoints} `;
    }
    if (!this.tieBreak && this.deuce()) {
      return (
        `${this.player1.gamePoints}-` + `${this.player2.gamePoints}, ` + "Deuce"
      );
    }
    if (!this.tieBreak && this.advantage()) {
      return (
        `${this.player1.gamePoints}-` +
        `${this.player2.gamePoints}, ` +
        `Advantage ${this.gameWinner()}`
      );
    }
    if (this.tieBreak) {
      return (
        `${this.player1.gamePoints}-` +
        `${this.player2.gamePoints}, ` +
        `${this.player1.points}-` +
        `${this.player2.points}`
      );
    }
    return (
      `${this.player1.gamePoints}-` +
      `${this.player2.gamePoints}, ` +
      `${this.convertPoints(this.player1.points)}-` +
      `${this.convertPoints(this.player2.points)}`
    );
  }
}
