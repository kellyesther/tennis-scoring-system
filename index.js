"use strict";
exports.__esModule = true;
exports.Match = void 0;
var Match = /** @class */ (function () {
    function Match(player1, player2) {
        this.tieBreak = false;
        this.player1 = { name: player1, points: 0, gamePoints: 0 };
        this.player2 = { name: player2, points: 0, gamePoints: 0 };
    }
    Match.prototype.convertPoints = function (point) {
        //translate a point to corresponding score value
        var scores = {
            0: 0,
            1: 15,
            2: 30,
            3: 40
        };
        return scores[point];
    };
    Match.prototype.deuce = function () {
        //returns true if at least 3 points have been scored by each player and scores are equal
        return (this.player1.points >= 3 && this.player2.points === this.player1.points);
    };
    Match.prototype.advantage = function () {
        // If at least 3 points have been scored by each side and a player has one more point than his opponent, the score of the game is "advantage" for the player in the lead.
        if (this.player1.points >= 3 &&
            this.player1.points === this.player2.points + 1) {
            //player 1 has advantage
            return true;
        }
        if (this.player2.points >= 3 &&
            this.player2.points === this.player1.points + 1) {
            //player 2 has advantage
            return true;
        }
        return false;
    };
    Match.prototype.gameWinner = function () {
        //check winner by comparing who has a higher point
        // console.log(this.player1.gamePoints);
        // console.log(this.player2.gamePoints);
        // console.log(this.tieBreak);
        if (this.player1.points > this.player2.points) {
            return this.player1.name;
        }
        return this.player2.name;
    };
    Match.prototype.setWinner = function () {
        if (this.player1.gamePoints > this.player2.gamePoints) {
            return this.player1.name;
        }
        return this.player2.name;
    };
    Match.prototype.resetPoints = function () {
        //reset points to zero for starting a new game
        this.player1.points = 0;
        this.player2.points = 0;
    };
    Match.prototype.gameEnded = function () {
        //A game is won by the first player to have won at least 4 points in total and at least 2 points more than the opponent.
        if (!this.tieBreak) {
            //   console.log("am i in tie break");
            if (this.player1.points >= 4 &&
                this.player1.points - this.player2.points >= 2) {
                // player 1 won
                return true;
            }
            if (this.player2.points >= 4 &&
                this.player2.points - this.player1.points >= 2) {
                // player 2 won
                return true;
            }
        }
        //in event of tiebreak game ends when player scores at least 7 points in total and at least 2 points more than the opponent
        if (this.player1.points >= 7 &&
            this.player1.points - this.player2.points >= 2) {
            // player 1 won tiebreak
            return true;
        }
        if (this.player2.points >= 7 &&
            this.player2.points - this.player1.points >= 2) {
            // player 2 won tiebreak
            return true;
        }
        return false;
    };
    Match.prototype.setWon = function () {
        // console.log(this.player1.gamePoints);
        // console.log(this.player2.gamePoints);
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
    Match.prototype.pointWonBy = function (player) {
        //checks which player won the point and increament their points
        if (player === this.player1.name) {
            this.player1.points += 1;
        }
        else if (player === this.player2.name) {
            this.player2.points += 1;
        }
    };
    Match.prototype.score = function () {
        if (this.setWon()) {
            //   console.log("did i win");
            return "Winner of tennis match is " + "".concat(this.setWinner());
        }
        //check if game has ended and return game point results
        if (this.gameEnded()) {
            if (this.gameWinner() === this.player1.name) {
                //player 1 wins, increament player 1 game point
                this.player1.gamePoints += 1;
                //reset points to start a new game
                this.resetPoints();
            }
            else if (this.gameWinner() === this.player2.name) {
                //player 1 wins, increament player 1 game point
                this.player2.gamePoints += 1;
                //reset points to start a new game
                this.resetPoints();
            }
            return "".concat(this.player1.gamePoints, "-") + "".concat(this.player2.gamePoints, " ");
        }
        //if game still ongoing check deuce and return score
        if (!this.tieBreak && this.deuce()) {
            return ("".concat(this.player1.gamePoints, "-") + "".concat(this.player2.gamePoints, ", ") + "Deuce");
        }
        //if game still ongoing check advantage and return score
        if (!this.tieBreak && this.advantage()) {
            return ("".concat(this.player1.gamePoints, "-") +
                "".concat(this.player2.gamePoints, ", ") +
                "Advantage ".concat(this.gameWinner()));
        }
        //if game still ongoing is a tiebreak, points are increament by 1, eg: 6-6, 0-1
        if (this.tieBreak) {
            return ("".concat(this.player1.gamePoints, "-") +
                "".concat(this.player2.gamePoints, ", ") +
                "".concat(this.player1.points, "-") +
                "".concat(this.player2.points));
        }
        //return score with overall game points followed by current game standing points, eg: 0-0, 0-15
        return ("".concat(this.player1.gamePoints, "-") +
            "".concat(this.player2.gamePoints, ", ") +
            "".concat(this.convertPoints(this.player1.points), "-") +
            "".concat(this.convertPoints(this.player2.points)));
    };
    return Match;
}());
exports.Match = Match;
