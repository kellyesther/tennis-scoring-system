"use strict";
exports.__esModule = true;
exports.Match = void 0;
var Match = /** @class */ (function () {
    function Match(player1, player2) {
        this.tieBreak = false;
        this.player1 = { name: player1, points: 0, gamePoints: 0 };
        this.player2 = { name: player2, points: 0, gamePoints: 0 };
    }
    /**
     * Translate a point to corresponding score value
     **/
    Match.prototype.convertPoints = function (point) {
        var scores = {
            0: 0,
            1: 15,
            2: 30,
            3: 40
        };
        return scores[point];
    };
    Match.prototype.deuce = function () {
        return (this.player1.points >= 3 && this.player2.points === this.player1.points);
    };
    /**
     * Check for advantage
     * If both players have at least 3 points and a player has one more than the opponent, that player has 'Advantage'
     */
    Match.prototype.advantage = function () {
        if (this.player1.points >= 3 &&
            this.player1.points === this.player2.points + 1) {
            return true;
        }
        if (this.player2.points >= 3 &&
            this.player2.points === this.player1.points + 1) {
            return true;
        }
        return false;
    };
    /**
     * Return game winner by comparing who has a higher point
     */
    Match.prototype.gameWinner = function () {
        //
        if (this.player1.points > this.player2.points) {
            return this.player1.name;
        }
        return this.player2.name;
    };
    /**
     * Return set winner by comparing who has a higher game point
     */
    Match.prototype.setWinner = function () {
        if (this.player1.gamePoints > this.player2.gamePoints) {
            return this.player1.name;
        }
        return this.player2.name;
    };
    /**
     * Reset points to zero for starting a new game
     */
    Match.prototype.resetPoints = function () {
        this.player1.points = 0;
        this.player2.points = 0;
    };
    /**
     * check if game ends based on players points and including event of tiebreak
     */
    Match.prototype.gameEnded = function () {
        if (!this.tieBreak) {
            if (this.player1.points >= 4 &&
                this.player1.points - this.player2.points >= 2) {
                return true;
            }
            if (this.player2.points >= 4 &&
                this.player2.points - this.player1.points >= 2) {
                return true;
            }
        }
        if (this.player1.points >= 7 &&
            this.player1.points - this.player2.points >= 2) {
            return true;
        }
        if (this.player2.points >= 7 &&
            this.player2.points - this.player1.points >= 2) {
            return true;
        }
        return false;
    };
    /**
     * check how a set is finished including tiebreak event
     */
    Match.prototype.setWon = function () {
        if (this.player1.gamePoints === 6 &&
            this.player1.gamePoints === this.player2.gamePoints) {
            this.tieBreak = true;
        }
        if (this.player1.gamePoints >= 6 &&
            this.player1.gamePoints - this.player2.gamePoints >= 2) {
            return true;
        }
        if (this.player2.gamePoints >= 6 &&
            this.player2.gamePoints - this.player1.gamePoints >= 2) {
            return true;
        }
        if (this.player1.gamePoints === 7 || this.player2.gamePoints === 7) {
            return true;
        }
        return false;
    };
    /**
     * Checks which player won the point and increament their point
     */
    Match.prototype.pointWonBy = function (player) {
        if (player === this.player1.name) {
            this.player1.points += 1;
        }
        else if (player === this.player2.name) {
            this.player2.points += 1;
        }
    };
    /**
     * Returns current match result.
     * Results have different format for different situation i.e set won, deuce, advantage, a game won, tiebreak or running game
     */
    Match.prototype.score = function () {
        if (this.setWon()) {
            return "Winner of tennis match is " + "".concat(this.setWinner());
        }
        if (this.gameEnded()) {
            if (this.gameWinner() === this.player1.name) {
                this.player1.gamePoints += 1;
                this.resetPoints();
            }
            else if (this.gameWinner() === this.player2.name) {
                this.player2.gamePoints += 1;
                this.resetPoints();
            }
            return "".concat(this.player1.gamePoints, "-") + "".concat(this.player2.gamePoints, " ");
        }
        if (!this.tieBreak && this.deuce()) {
            return ("".concat(this.player1.gamePoints, "-") + "".concat(this.player2.gamePoints, ", ") + "Deuce");
        }
        if (!this.tieBreak && this.advantage()) {
            return ("".concat(this.player1.gamePoints, "-") +
                "".concat(this.player2.gamePoints, ", ") +
                "Advantage ".concat(this.gameWinner()));
        }
        if (this.tieBreak) {
            return ("".concat(this.player1.gamePoints, "-") +
                "".concat(this.player2.gamePoints, ", ") +
                "".concat(this.player1.points, "-") +
                "".concat(this.player2.points));
        }
        return ("".concat(this.player1.gamePoints, "-") +
            "".concat(this.player2.gamePoints, ", ") +
            "".concat(this.convertPoints(this.player1.points), "-") +
            "".concat(this.convertPoints(this.player2.points)));
    };
    return Match;
}());
exports.Match = Match;
