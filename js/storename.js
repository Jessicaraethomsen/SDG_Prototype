
function setName() {



		if (localStorage.getItem('user')) {
         document.getElementById("playergirl").innerHTML = localStorage.getItem('user');
   		 }

		else if (localStorage.getItem('userboy')) {		

		document.getElementById("playerboy").innerHTML = localStorage.getItem('userboy');
			
		}
		
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
		document.getElementById("playergirl").innerHTML = this.name;
		

		localStorage.setItem('userboy', '');
		document.getElementById("playerboy").innerHTML = '';
		
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
		document.getElementById("playerboy").innerHTML =  this.nameboy;


		localStorage.setItem('user', '');
		document.getElementById("playergirl").innerHTML = '';

		
}