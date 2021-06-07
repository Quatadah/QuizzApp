const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = localStorage.getItem("mostRecentScore");
const showText = document.getElementById("show");

showText.innerHTML = `Your score is <strong>${finalScore}</strong>`;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e){
    e.preventDefault();
}

