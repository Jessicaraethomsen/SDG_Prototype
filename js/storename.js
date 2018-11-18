function setName() {
 var playername = localStorage.getItem('user');
		this.name = playername;
		this.score = localStorage.getItem('userScore');
		document.getElementById("player").innerHTML = this.name;
}

 function myFunction() {

		// prepare client storage for user + score if doesn't exist
		if (!localStorage.getItem('user')) {
			localStorage.setItem('user', '');
			localStorage.setItem('userScore', 0);
		}
		// prompt for user name if not yet set
		if (localStorage.getItem('user') === '') {
			this.name = prompt("Please enter your name", "Mr. X");
			// set username
			localStorage.setItem('user', this.name);
		}
		// get player name from local storage
		var playername = localStorage.getItem('user');
		this.name = playername;
		this.score = localStorage.getItem('userScore');
		alert('Hi ' + this.name + ', your all-time score is ' + this.score + '.  Ready to roll?');
		document.getElementById("player").innerHTML = this.name;
	}
