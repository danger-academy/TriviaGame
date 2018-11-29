// Simple game, a timed trivia game where one multiple-choice question at a time is displayed, 
// where the timer encompasses the entirety of the game,
// and a final summary of correct/incorrect/unanswered questions is displayed at the end.

// Start with the "start button"
$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
})

$(document).on('click', '#reset', function () {
    game.reset();
})

// Here we will define our questions and answers
var questions = [{
	question: "Which album was named by Magnet Magazine as the Best Album of the 90's",
	answers: ["Radiohead ~ OK Computer", "Beck ~ Odelay", "Nirvana ~ Nevermind", "Neutral Milk Hotel ~ In The Aeroplane Over The Sea"],
	correctAnswer: "Neutral Milk Hotel ~ In The Aeroplane Over The Sea",
	image : "assets/images/aeroplane.jpg"
}, {
	question: "Which band or artist debuted in 1992 with the critically-acclaimed album, Dry?",
	answers: ["PJ Harvey", "Bikini Kill", "Sleater-Kinney", "Nirvana"],
	correctAnswer: "PJ Harvey",
	image : "assets/images/pjharvey.jpg"
}, {
	question: "Which was the best record label of the 90's?",
	answers: ["Nirvana", "4AD", "K Records", "Kill Rock Stars"],
	correctAnswer: "Kill Rock Stars",
	image : "assets/images/krs.jpg"
}, {
	question: "Which band formed to pay tribute to Mother Love Bone's late singer, Andrew Wood?",
	answers: ["Alice in Chains", "Sublime", "Temple of the Dog", "Nirvana"],
	correctAnswer: "Temple of the Dog",
	image : "assets/images/temple.jpg"
}, {
	question: "Which band or artist is widely credited with bringing trip hop to the mainstream, especially for US audiences?",
	answers: ["Tone Loc", "Portishead", "Nirvana", "The Offspring"],
	correctAnswer: "Portishead",
	image : "assets/images/dummy.jpg"
}, {
	question: "Which solo artist had a #1 hit single before even releasing a debut album?",
	answers: ["Nirvana", "Tori Amos", "Courtney Love", "Lisa Loeb"],
	correctAnswer: "Lisa Loeb",
	image : "assets/images/loeb.jpg"
}, {
	question: "Which band formed in 1981, but didn't garner major attention until the release of the 1995 album, University?",
	answers: ["Throwing Muses", "Sonic Youth", "Unwound", "Nirvana"],
	correctAnswer: "Throwing Muses",
	image : "assets/images/muses.jpg"
}, {
	question: "Which band formed in 1981, but in 1991 was given credit for 'breaking punk' by touring with bands such as Nirvana, Babes in Toyland, and Dinosaur Jr.?",
	answers: ["Nirvana", "Sonic Youth", "Folk Implosion", "The Ramones"],
	correctAnswer: "Sonic Youth",
	image : "assets/images/sonic.jpg"
}, {
	question: "Which artist or band had the best-selling single of the 90's?",
	answers: ["Pearl Jam ~ Evenflow", "Radiohead ~ Paranoid Android", "Elton John ~ Candle in the Wind", "Nirvana ~ Spank Thru"],
	correctAnswer: "Elton John ~ Candle in the Wind",
	image : "assets/images/elton.jpg"
}, {
	question: "Which band, though thoroughly identified with the 90's, actually debuted in the 80's with their album, Bleach?",
	answers: ["The Bee Gee's", "Aerosmith", "N*SYNC", "Nirvana"],
	correctAnswer: "Nirvana",
	image : "assets/images/nirvana.jpg"
}];
// Game mechanics will be set out here
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 10,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    // Countdown timer, display time remaining, announce when time is up
    // question countdown
    countdown: function () {
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("Time's up, pal!");
            game.timeup();
        }
    },
    // set timer
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $('#content').html("<h2> TIME REMAINING <span id='counter'>10</span> Seconds</h2>");
        $('#content').append('<h2>' + questions[game.currentQuestion].
            question + '<h2>');
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $('#content').append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.
                currentQuestion].answers[i] + '">' + questions[game.
                    currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = 10;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeup: function () {
        clearInterval(timer);
        game.unanswered++;
        $('#content').html('<h2>Pencils down!</h2>')
        $('#content').append('<h3> The only acceptable answer was : ' + questions[game.
            currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    // Game over, display final tally, try again
    results: function () {
        clearInterval(timer);
        $('#content').html("<h2>Finito!</h2>");
        $('#content').append("<h3>Acceptable:" + game.correct + "</h3");
        $('#content').append("<h3>Unacceptable:" + game.incorrect + "</h3>");
        $('#content').append("<h3>Not. Even. Answered:" + game.unanswered + "</h3>");
        $('#content').append("<button id='reset'>Try again?</button>");
    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].
            correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("You Got It");
        clearInterval(timer);
        game.correct++;
        $('#content').html('<h2>Ooooooh, good for YOU.</h2>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("Wrong!!!")
        clearInterval(timer);
        game.incorrect++;
        $('#content').html('<h2>HA! Was that...was that a JOKE?</h2>');
        $('#content').append('<h3> The only acceptable answer was : ' + questions[game.
            currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    // Reset the game
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    }
}
