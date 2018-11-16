
function check(){

	var question1 = document.quiz.question1.value;
	var question2 = document.quiz.question2.value;
	var question3 = document.quiz.question3.value;
	var correct = 0;


	if (question1 == "underwater") {
		correct++;
}
	if (question2 == "70") {
		correct++;
}	
	if (question3 == "10") {
		correct++;
	}
	
	var pictures = ["img/win.png", "img/meh.png", "img/lose.png"];
	var messages = ["Great job!", "Good try", "Try Again"];
	var score;

	if (correct == 0) {
		score = 2;
	}

	if (correct > 0 && correct < 3) {
		score = 1;
	}

	if (correct == 3) {
		score = 0;
	}

	document.getElementById("after_submit").style.visibility = "visible";
	document.getElementById("message").innerHTML = messages[score];
	document.getElementById("number_correct").innerHTML = "You got " + correct + " correct.";
	document.getElementById("picture").src = pictures[score];
	};

function restart(){

	document.getElementById("after_submit").style.visibility = "hidden";
	};
	