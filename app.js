//jshint esversion: 6

//game start
let gameStarted = false;

const buttonColours = ['red', 'blue', 'green', 'yellow'];

//The patterns the simon game generate
let gamePattern = [];

//Game level
let level = 0;

//The buttons the user clicked
let userClickedPattern = [];

//reading the button the user clicked

$(this).keypress(function(){

 if(!gameStarted){
  gameStarted = true;
  $('body h1').text('Level ' + level);
  nextSequence();
 }
});

$('.btn').click( function() {
 let userChosenColour = $(this).attr("id");

 userClickedPattern.push(userChosenColour);

 playSound(userChosenColour);

 //adding animation to clicks
 animatePress(userChosenColour);

 checkAnswer(userClickedPattern.length - 1);


});

//The next button the computer generate
function nextSequence(){
 console.log("Success");
 //Once gamepattern is clicked reset userCLickedPattern to empty array
 userClickedPattern = [];

 const randomNumber = Math.floor(Math.random() * 4);
 
 const randomChosenColour = buttonColours[randomNumber];

 //animate the computer pressed button
 $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);

 gamePattern.push(randomChosenColour);

 level++;
}

function checkAnswer(currentLevel){
 if(userClickedPattern.length === gamePattern.length){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    $('body h1').text("Level " + level);
    setTimeout(function(){
     nextSequence();
    }, 1000);
  } else{
    $("body h1").text("Game Over, Press Any Key to Restart");
    $('body').addClass("game-over");
    playSound('wrong');
    setTimeout(function(){
      $('body').removeClass("game-over");
    }, 100);
    startOver();
  }
 }else{
  console.log("wrong");
 }
}

function playSound(file){
 let audio = new Audio("sounds/"+file + ".mp3");
 audio.play();
}

function animatePress(currentColour){
 $('#'+currentColour).addClass("pressed");
 setTimeout(function(){
  $('#'+currentColour).removeClass('pressed');
 }, 100);
}


function startOver(){
  gamePattern = [];
  level = 0;
  gameStarted = false;

}