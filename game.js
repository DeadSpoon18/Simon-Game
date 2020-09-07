var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4)
    randomChosenColor = buttonColours[randomNumber]
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
    animatePress(randomChosenColor)
    level++
    $("#level-title").text("Level " + level)
    userClickedPattern = [];
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
    console.log(userClickedPattern)
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100)
}

$(document).keydown(function(){
    if(started === false) {
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true;
    }  
})

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
            if(userClickedPattern.length === gamePattern.length) {
                setTimeout(function(){
                    nextSequence()
                },1000)
            }
    }   else {
        var gameOver = new Audio("./sounds/wrong.mp3")
        gameOver.play()
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Press a key to start again")
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    userClickedPattern = []
    started = false
}
