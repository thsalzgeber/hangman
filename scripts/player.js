class Player {
    constructor(firstName) {
        this.firstName = firstName;
        this.gamesPlayed = 0;
        this.gamesWon = 0;
        this.gamesLost = 0;
    }

    playGame(result) {
        this.gamesPlayed++;
        if (result === 'won') {
            this.gamesWon++;
        } else if (result === 'lost') {
            this.gamesLost++;
        }
    }

    displayStatistics() {
        $statistic.text(`Player '${this.firstName}' has played '${this.gamesPlayed} ${this.gamesPlayed === 1 ? 'game' : 'games'}',
         guessed the word '${this.gamesWon} ${this.gamesWon === 1 ? 'time' : 'times'}' correct
          and '${this.gamesLost} ${this.gamesLost === 1 ? 'time' : 'times'}' wrong.`);
    }
}
