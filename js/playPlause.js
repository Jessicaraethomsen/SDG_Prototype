
var audio = new Audio('audio_file.mp3');

function setPlayPause()
{
    // Here we toggle playpause from true to false and vice versa
    playpause = !playpause;
    if(playpause)
    {
        document.getElementById("playpause").value = "Play";
        alert("Gallery has been paused!");
        // Instead of the alert statement you would actually do the pausing of the gallery here
    }
    else
    {
        document.getElementById("playpause").value = "Pause";
        alert("Gallery is now playing!");
        // Instead of the alert statement you would place the code here that would start the gallery playing
    }
}