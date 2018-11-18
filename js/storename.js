
function resetname() {
		localStorage.clear();	
	}

function setName() {
 		var playername = localStorage.getItem('user');
		this.name = playername;
		document.getElementById("playergirl").innerHTML = this.name;

		var playernameboy = localStorage.getItem('userboy');
		this.nameboy = playernameboy;
		
		document.getElementById("playerboy").innerHTML = this.nameboy;
}

 function myGirl() {

		// prepare client storage for user + score if doesn't exist
		if (!localStorage.getItem('user')) {
			localStorage.setItem('user', '');
			
		}
		// prompt for user name if not yet set
		if (localStorage.getItem('user') === '') {
			this.name = "Sally";
			localStorage.setItem('user', this.name);
		}


		// get player name from local storage
		var playername = localStorage.getItem('user');
		this.name = playername;
		alert('Hi ' + this.name + ' Are you Ready to Play');
		document.getElementById("playergirl").innerHTML = this.name;
		localStorage.setItem('userboy', '');
		}
		




 function myBoy() {

		// prepare client storage for user + score if doesn't exist
		if (!localStorage.getItem('userboy')) {
			localStorage.setItem('userboy', '');
			
		}
		// prompt for user name if not yet set
		if (localStorage.getItem('userboy') === '') {
			this.nameboy = "Walter";
			localStorage.setItem('userboy', this.nameboy);
		}
		// get player name from local storage
		var playernameboy = localStorage.getItem('userboy');
		this.nameboy = playernameboy;
		alert('Hi ' + this.nameboy + ' Are you Ready to Play');
		document.getElementById("playerboy").innerHTML = this.nameboy;
		localStorage.setItem('user', '');

		
}