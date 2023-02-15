var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).click(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSounds(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },100);
        }
    }
    else{
      playSounds("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
            $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game-over, Press any key to restart");
      startOver();
    }
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSounds(randomChosenColor);
}

function playSounds(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}