(function() {

  const myQuestions = [
  {
    question: "The oceans cover ______ of the Earth's surface.",
    answers: {
      a: "70 percent",
      b: "40 percent",
      c: "20 percent"
    },
    correctAnswer: "a"
  },
  {
    question: "What are the main categories of sea life?",
    answers: {
      a: "swimmers and non-swimmers",
      b: "swimmers, floaters and creatures on the sea floor",
      c: "fish, mammals and microscopic creatures"
    },
    correctAnswer: "b"
  },

  {
    question: "How many different identified spiecies live under water?",
    answers: {
      a: "200 000",
      b: "1 000 000",
      c: "500"
    },
    correctAnswer: "a"
  },

  {
    question: "How many percent of Ocean is polluted",
    answers: {
      a: "10%",
      b: "40%",
      c: "80%"
    },
    correctAnswer: "b"
  },
  {
    question: "So, what can you do about ocean plastic pollution?",
    answers: {
      a: "Reduce Your Use of Single-Use Plastics.",
      b: "Support Organizations Addressing Plastic Pollution",
      c: "All of the above"
    },
    correctAnswer: "c"
  }
  ];


  function buildQuiz() {

    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

      //  HERE WE STORE THE AWNSERSstore the list of answer choices array
      const answers = [];

      // and for each available answer...


      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button

        answers.push(
          `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter} :
          ${currentQuestion.answers[letter]}
          </label>`
          );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
        </div>`
        );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }


//END OF BUILD QUIZ FUNCTION

//Confetti is build using object literal

// Confetti Effect by Gtibo "Confetti Party"
//------------------------------------------------------------------
function confettiEffect (){
  //grabing area to create the effect
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  // creating the tabel
  particle = [];
  particleCount = 0,
  gravity = 0.5,
  colors = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548'
  ];

  for( var i = 0; i < 400; i++){

    particle.push({
      x : width/2,
      y : height/2,
      boxW : randomRange(5,20),
      boxH : randomRange(5,20),
      size : randomRange(2,8),

      spikeran:randomRange(3,5),

      velX :randomRange(-8,8),
      velY :randomRange(-50,-10),

      angle :convertToRadians(randomRange(0,360)),
      color:colors[Math.floor(Math.random() * colors.length)],
      anglespin:randomRange(-0.2,0.2),

      draw : function(){
        context.save();
        context.translate(this.x,this.y);
        context.rotate(this.angle);
        context.fillStyle=this.color;
        context.beginPath();

        context.fillRect(this.boxW/2*-1,this.boxH/2*-1,this.boxW,this.boxH);
        context.fill();
        context.closePath();
        context.restore();
        this.angle += this.anglespin;
        this.velY*= 0.999;
        this.velY += 0.3;

        this.x += this.velX;
        this.y += this.velY;

        if(this.y < 0){
         this.velY *= -0.2;
         this.velX *= 0.9;
       };

       if(this.y > height){
        this.anglespin = 0;
        this.y = height;
        this.velY *= -0.2;
        this.velX *= 0.9;
      };

      if(this.x > width ||this.x< 0){
        this.velX *= -0.5;
      };
    },
  });
  }

  function drawScreen(){
    context.globalAlpha = 1;
    for( var i = 0; i < particle.length; i++){
      particle[i].draw();
    }
  }

  function loadImage(url){
    var img = document.createElement("img");
    img.src=url;
    return img;
  }

  function update(){
    context.clearRect(0,0,width,height);
    drawScreen();
    requestAnimationFrame(update);
  }

  update();

  function randomRange(min, max){
    return min + Math.random() * (max - min );
  }

  function randomInt(min, max){
    return Math.floor(min + Math.random()* (max - min + 1));
  }

  function convertToRadians(degree) {
    return degree*(Math.PI/180);
  }

  function drawStar(cx, cy, spikes, outerRadius, innerRadius,color) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.strokeSyle = "#000";
    context.beginPath();
    context.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      context.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      context.lineTo(x, y)
      rot += step
    }

    context.lineTo(cx, cy - outerRadius)
    context.closePath();
    context.fillStyle = color;
    context.fill();

  }
}




function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[questionNumber].style.color = "#56c02a";




      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "#eb1c2d";
        answerContainers[questionNumber].style.border = "thick solid white";
      }
    });


    if (numCorrect >= 4) {
     confettiEffect();
     play();
     resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
         feedbackContainer.innerHTML = 'GOOD JOB EXPLORER!';



   } else {

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    feedbackContainer.innerHTML = 'TRY AGAIN and get 4/5 to see a SUPRISE';



  }

    // show number of correct answers out of total
  }


  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    

    //displaying the buttons in the right order
    if (currentSlide === 0) {
    previousButton.style.display = "none";
    tryButton.style.display = "none";
    submitButton.style.display = "none";

    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
     //tryButton.style.display = "inline-block";

    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

 //Adding a number to the currentslide varible for the buttons
 function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

function clearscore() {
  numCorrect = 0;
}



const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const feedbackContainer = document.getElementById("feedback");
const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();


  //buttons to HTML Ids
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const tryButton = document.getElementById("tryAgain");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  showSlide(0);



  // on CLICK: show results
  submitButton.addEventListener("click", showResults);
  tryButton.addEventListener("click", clearscore );
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);



})();


(function() {
  'use strict';

  var btnScrollDown = document.querySelector('#scroll_down');

  function scrollDown() {
    var windowCoords = document.documentElement.clientHeight;
    (function scroll() {
      if (window.pageYOffset < windowCoords) {
        window.scrollBy(0, 10);
        setTimeout(scroll, 0);
      }
      if (window.pageYOffset > windowCoords) {
        window.scrollTo(0, windowCoords);
      }
    })();
  }

  btnScrollDown.addEventListener('click', scrollDown);
})();



