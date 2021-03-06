

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let bar = document.getElementById("progressBarFull")

let questions = [];

fetch("../questions.json")
    .then( res => {
        console.log(res);
        return res.json();
    }).then( loadedQuestions => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startGame();
    })
    .catch( err => {
        console.error(err);
    })

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


function updateBar(){
    bar.style.width = (width + BAR_WIDTH/3);
}

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    
};

getNewQuestion = () => {
    if (availableQuestions === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("../html/end.html");
    }
    

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    bar.style.width = ((questionCounter / MAX_QUESTIONS) * 100 ).toString() + "%";


    const questionIndex = Math.floor(Math.random() *  availableQuestions.length) ;
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;


    callback();
    
};

callback = () => {
    choices.forEach( choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];

            choice.style.backgroundColor = selectedAnswer == currentQuestion["answer"] ? "#28a745" : "#dc3545"; 
            score += selectedAnswer == currentQuestion["answer"] ? CORRECT_BONUS : 0;
            scoreText.innerText = score.toString();
            setTimeout(() => {
                getNewQuestion();
                choice.style.backgroundColor = "white";
                       }, 1000);
           
    })
});

}

//startGame(); 

