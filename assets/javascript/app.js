// Simple game, a timed trivia game where one multiple-choice question at a time is displayed, 
// where the timer encompasses the entirety of the game,
// and a final summary of correct/incorrect/unanswered questions is displayed at the end.

// Start with the "start button"
$('#start').on('click',function(){
	$('#start').remove();
	game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
	game.clicked(e);
})

$(document).on('click','#reset',function(){
	game.reset();
})

// Here we will define our questions and answers

// Game mechanics will be set out here

    // Countdown timer, display time remaining, announce when time is up
	
    // Game over, display final tally
	
        // Reset the game
	
