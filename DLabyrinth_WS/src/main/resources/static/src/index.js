game = new Phaser.Game(800, 600, Phaser.AUTO, "gameDiv");

game.state.add('bootState', DLabyrinth.bootState)
game.state.add('preloadState', DLabyrinth.preloadState)
game.state.add('menuState', DLabyrinth.menuState)
game.state.add('optionState', DLabyrinth.optionState)
game.state.add('matchingState', DLabyrinth.matchingState)
game.state.add('levelState', DLabyrinth.levelState)
game.state.add('endingState', DLabyrinth.endingState)
  
game.state.start('bootState')
