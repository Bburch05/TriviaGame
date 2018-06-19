// Global Variables

var correctCount = 0;
var incorrectCount = 0;
var time = 30;
var questionNum = 0;
// Global Vars for timing
var timer
var qChange
var qLocDiv = (".qLoc")

// Trivia Questions
var q1 = {
    question:"Which game Is NOT a title developed by From Software?",
    correctIMG: "assets/images/front.jpg",
    answers: [
    "Dark Souls",
    "Front Mission",
    "Armored Core", 
    "The Adventures of Cookies and Cream"],
    //index in answers array
    correctA : 1
}
var q2 = {
    question:
    "What is the name of the psycological effect occurs when people devote so much time and attention to an activity that it begins to pattern their thoughts, mental images, and dreams?",
    correctIMG: "assets/images/effect.png",
    answers: [
    "The Tetris Effect",
    "Pattern Psychosis",
    "Neuropsychosis", 
    "Jumpman"],
    correctA : 0
}
var q3 = {
    question:"Which Mario game first introduced the Poison Mushroom Powerup?",
    correctIMG: "assets/images/poison.png",
    answers: [
    "Super Mario World",
    "Super Mario Bros. 2",
    "Super Mario Bros. The Lost Levels", 
    "Super Mario RPG"],
    correctA : 2
}
var q4 = {
    question:"This Character is Mario's main antagonist.",
    correctIMG: "assets/images/bowser.png",
    answers: [
    "Bowser",
    "Luigi",
    "Waluigi", 
    "Wario"],
    correctA : 0
}
var q5 = {
    question:"The name of the giant robots in Respawn Interactive's 'Titanfall' are called what?",
    correctIMG: "assets/images/titan.gif",
    answers: [
    "Wanzers",
    "Ravens",
    "Mechas", 
    "Titans"],
    correctA : 3
}
var q6 = {
    question:"What's the name of Sonic's fox sidekick?",
    correctIMG: "assets/images/tails.png",
    answers: [
    "Flyboy",
    "Luigi",
    "Tails", 
    "Zelda"],
    correctA : 2
}
var q7 = {
    question:"Who is known as the 'Father of all Video Games?'",
    correctIMG: "assets/images/ralph.jpg",
    answers: [
    "Nolan Bushnell",
    "Bill Gates",
    "Shigeru Miyamoto", 
    "Ralph H. Baer"],
    correctA : 3
}
var q8 = {
    question:"Which of the following is NOT a character in the Metal Gear Solid Series",
    correctIMG: "assets/images/snakes.jpg",
    answers: [
    "Liquid Snake",
    "Plasma Snake",
    "Solid Snake", 
    "Solidus Snake"],
    correctA : 1
}

//array for trivia questions 
var trivia = [q1,q2,q3,q4,q5,q6,q7,q8];

//Functions

// onClick check player answer
function checkAnswer(){
    var choice = parseInt(this.id);
    if (choice === trivia[questionNum].correctA) {
        correctCount++;
        clearInterval(timer);
        $(qLocDiv).empty();
        $(".theAnswer").append("<p>Correct! " + trivia[questionNum].answers[trivia[questionNum].correctA] + " is the Answer!</p>");
        $(".theAnswer").append("<img src='"+ trivia[questionNum].correctIMG + "' class='img-fluid' />" )
        qChange = setTimeout(questionChange, 3000)
    }
    else {
        incorrectCount++;
        clearInterval(timer);
        $(qLocDiv).empty();
        $(".theAnswer").html("<p>Incorrect! " + trivia[questionNum].answers[trivia[questionNum].correctA] + " was the answer!</p>");
        $(".theAnswer").append("<img src='"+ trivia[questionNum].correctIMG + "' class='img-fluid' />" )
        qChange = setTimeout(questionChange,3000);
    }
    
 }

 //function for timer
function countdown(){
    time--
    $("#time").text(time);
        if (time === 0) {
            incorrectCount--;
            clearInterval(timer);
            $(qLocDiv).empty();
            $(".theAnswer").html("<p>Time's up! Sorry but the answer was: " + trivia[questionNum].answers[trivia[questionNum].correctA] + "</p>");
            $(".theAnswer").append("<img src='"+ trivia[questionNum].correctIMG + "' class='img-fluid' />" )
            qChange = setTimeout(questionChange, 3000);
        }
}

//function used to change the answer
function questionChange(){
    $(".theAnswer").empty();
    questionNum++
    //if there's no more questions go to the final screen
    if (questionNum === trivia.length){
        finalTally();
    }
    //else display next question
    else {
        displayQuestion(trivia[questionNum])
}
}

//Function to change Trivia
function displayQuestion(questionLoc){
    $(".quesNumb").text("Question " + (questionNum + 1) + ":" )
    time = 30;
    $("#time").text(time);
    timer = setInterval(countdown,1000);
    var tDiv = $(qLocDiv);
    var qText = $("<h1>");
    qText.text(questionLoc.question);
    var answersUL = $("<ul>");
    for(var i= 0; i < questionLoc.answers.length; i++){
        answersLI = $("<li>");
        answersLI.text(questionLoc.answers[i]).attr("id", i).attr("class","ans");
        answersUL.append(answersLI);
    }
    tDiv.append(qText,answersUL);
    $(".ans").on("click", checkAnswer);
}

//function to display final tally when game is done.
function finalTally(){
    questionNum = 0;
    $(".quesNumb").empty();
    var tallyDiv = $(qLocDiv);

        if (correctCount === trivia.length){
        tallyDiv.append("<h1 class='tally'>You aced the trivia! You're a real trivia pro!</h1>")
        }

        else if (correctCount > incorrectCount){
        tallyDiv.append("<h1 class='tally'>Well Done!</h1>");
        tallyDiv.append("<p>You got " + correctCount +" answers correct and only missed " + incorrectCount + " questions!</p>")
        }

        else {
        tallyDiv.append("<p>You got " + correctCount + " questions correct and missed " + incorrectCount + " questions</p>")
        tallyDiv.append("<h1 class='tally'>Brush up your knowledge and take it again?</h1>");
        }
    
    $("#start").text("Try Again?").removeClass("hide")

    
}






//button on click that starts timer and displays first question
$("#start").on("click",function(){
    $(qLocDiv).empty();
    $(".quesNumb").text();
    correctCount = 0;
    incorrectCount = 0;
    displayQuestion(trivia[questionNum]);
    $("#start").addClass("hide");
})


