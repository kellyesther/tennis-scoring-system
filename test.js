"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var match = new index_1.Match("player 1", "player 2");
//just a shortcut to win a game by winning 4 points straight
var winAGame = function (player) {
    match.pointWonBy(player);
    match.pointWonBy(player);
    match.pointWonBy(player);
    match.pointWonBy(player);
    console.log(match.score());
};
//test for match without tiebreak
var testNormalGame = function () {
    //check running scores and case for deuce and advantage
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, 15-15"
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    console.log(match.score()); // this will return "0-0, 40-15"
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Deuce"
    match.pointWonBy("player 1");
    console.log(match.score()); // this will return "0-0, Advantage player 1"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Deuce"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Advantage player 2"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-1" (Player 2 won first game)
    //increament game score to reach set winner
    winAGame("player 2"); // return 0-2
    winAGame("player 1"); // return 1-2
    winAGame("player 2"); // return 1-3
    winAGame("player 1"); // return 2-3
    winAGame("player 2"); // return 2-4
    winAGame("player 2"); // return 2-5
    winAGame("player 1"); // return 3-5
    winAGame("player 1"); // return 4-5
    winAGame("player 1"); // return 5-5
    winAGame("player 2"); // return 5-6
    winAGame("player 2"); // return 5-7  (player 2 has won the set)
    match.pointWonBy("player 2"); // adding more points wont matter as set has finished
    console.log(match.score()); // return Winner of tennis match is player 2
};
var testNormalGame2 = function () {
    //check running scores and case for deuce and advantage
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, 15-15"
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    console.log(match.score()); // this will return "0-0, 40-15"
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Deuce"
    match.pointWonBy("player 1");
    console.log(match.score()); // this will return "0-0, Advantage player 1"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Deuce"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Advantage player 2"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-1" (Player 2 won first game)
    //increament game score to reach set winner
    winAGame("player 2"); // return 0-2
    winAGame("player 1"); // return 1-2
    winAGame("player 2"); // return 1-3
    winAGame("player 1"); // return 2-3
    winAGame("player 2"); // return 2-4
    winAGame("player 2"); // return 2-5
    winAGame("player 1"); // return 3-5
    winAGame("player 1"); // return 4-5
    winAGame("player 2"); // return 4-6 (player 2 has won the set)
    match.pointWonBy("player 1"); // adding more points wont matter as set has finished
    console.log(match.score()); // return Winner of tennis match is player 2
};
//test for match with tiebreak
var testTieBreakGame = function () {
    //check running scores and case for deuce and advantage
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, 15-15"
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    console.log(match.score()); // this will return "0-0, 40-15"
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Deuce"
    match.pointWonBy("player 1");
    console.log(match.score()); // this will return "0-0, Advantage player 1"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Deuce"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Advantage player 2"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-1" (Player 2 won first game)
    //increament game score to reach tiebreak
    winAGame("player 2"); // return 0-2
    winAGame("player 1"); // return 1-2
    winAGame("player 2"); // return 1-3
    winAGame("player 2"); // return 1-4
    winAGame("player 2"); // return 1-5
    winAGame("player 1"); // return 2-5
    winAGame("player 1"); // return 3-5
    winAGame("player 1"); // return 4-5
    winAGame("player 1"); // return 5-5
    winAGame("player 1"); // return 6-5
    winAGame("player 2"); // return 6-6 (this indicates a tiebreak)
    //check running scores when in tie break
    match.pointWonBy("player 1");
    console.log(match.score()); // return 6-6, 1-0
    match.pointWonBy("player 1");
    console.log(match.score()); // return 6-6, 2-0
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    console.log(match.score()); // return 6-6, 6-0
    match.pointWonBy("player 1");
    console.log(match.score()); // return 7-6  (player 1 has won the set)
    match.pointWonBy("player 2"); // adding more points wont matter as set has finished
    console.log(match.score()); // return Winner of tennis match is player 1
};
var testTieBreakGame2 = function () {
    //check running scores and case for deuce and advantage
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, 15-15"
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    console.log(match.score()); // this will return "0-0, 40-15"
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Deuce"
    match.pointWonBy("player 1");
    console.log(match.score()); // this will return "0-0, Advantage player 1"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Deuce"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-0, Advantage player 2"
    match.pointWonBy("player 2");
    console.log(match.score()); // this will return "0-1" (Player 2 won first game)
    //increament game score to reach tiebreak
    winAGame("player 2"); // return 0-2
    winAGame("player 1"); // return 1-2
    winAGame("player 2"); // return 1-3
    winAGame("player 2"); // return 1-4
    winAGame("player 2"); // return 1-5
    winAGame("player 1"); // return 2-5
    winAGame("player 1"); // return 3-5
    winAGame("player 1"); // return 4-5
    winAGame("player 1"); // return 5-5
    winAGame("player 1"); // return 6-5
    winAGame("player 2"); // return 6-6 (this indicates a tiebreak)
    //check running scores when in tie break
    match.pointWonBy("player 1");
    console.log(match.score()); // return 6-6, 1-0
    match.pointWonBy("player 1");
    console.log(match.score()); // return 6-6, 2-0
    winAGame("player 2"); //return 6-6, 2-4
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    console.log(match.score()); // return 6-6, 6-4
    match.pointWonBy("player 2");
    console.log(match.score()); // return 6-6, 6-5
    match.pointWonBy("player 2"); //
    console.log(match.score()); // return 6-6, 6-6
    match.pointWonBy("player 2"); //
    console.log(match.score()); // return 6-6, 6-7
    match.pointWonBy("player 1"); //
    console.log(match.score()); // return 6-6, 7-7
    match.pointWonBy("player 2"); //
    console.log(match.score()); // return 6-6, 7-8
};
// uncomment to test for each match case
// testNormalGame();
// testTieBreakGame();
testTieBreakGame2();
