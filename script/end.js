const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = localStorage.getItem("mostRecentScore");
const showText = document.getElementById("show");

showText.innerHTML = `Your score is <strong>${finalScore}</strong>`;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;



username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e){
    e.preventDefault();

    const score = {
        score: finalScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort( (a, b) =>  b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("../html/index.html");
}

