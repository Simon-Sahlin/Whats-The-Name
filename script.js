const cardComp = document.querySelector(".card")
const cardImg = document.querySelector(".card>div")
const cardText = document.querySelector(".card>h2")
const progressBar = document.querySelector("#progressBar>#innerBar")
const progressText = document.querySelector("#progressBar>#text>p")

let cards = null;
const input = document.getElementById('folderInput');
input.addEventListener('change', () => {
    const files = Array.from(input.files);
    imageFiles = files.filter(file => file.type.startsWith('image/'));
    cards = imageFiles.map(file => {
        return {
            name: file.name,
            url: URL.createObjectURL(file),
            score: 10
        }
    })
    input.classList.add("hidden")
    startGame();
});


let absoluteMax = 0;
function pickNewCard(){
    let cumScores = [];
    for (let i = 0; i < cards.length; i++){
        cumScores[i] = cards[i].score + (cumScores[i-1] || 0);
    }
    const max = cumScores[cumScores.length - 1]
    const rand = max * Math.random();
    for (let i = 0; i < cumScores.length; i++){
        if (cumScores[i] >= rand){
            currentIndex = i;
            break
        }
    }

    if (max > absoluteMax) absoluteMax = max
    let percentage = 100 - (100*max/absoluteMax)
    if (percentage > 100) percentage = 100;
    progressBar.style.setProperty("width", `${percentage}%`)
    progressText.innerHTML = Math.round(percentage) + "%"
    
    if (percentage == 100){
        cardComp.classList.add("show");
        cardImg.style.setProperty("background-image", `url('assets/winstate.png')`);
        cardText.innerHTML = "<b><u>Well done!</b></u><br>Refresh to play again";
        return;
    }

    cardComp.classList.remove("show");
    cardImg.style.setProperty("background-image", `url("${cards[currentIndex].url}")`);
    cardText.innerHTML = cards[currentIndex].name;
}


let currentIndex = 0;
let timerStart = 0;
let timerStop = 0;

function stopTimer(){
    if (timerStart == 0)
        return 0;
    if (timerStop == 0)
        timerStop = Date.now();
    return (7.5*Math.E**(-0.2*(timerStop - timerStart)*0.001) + 4)
}

function startTimer(){
    timerStart = Date.now();
    timerStop = 0;
}

function actionRight(){
    let score = stopTimer();
    cards[currentIndex].score -= score;
    if (cards[currentIndex].score < 0)
        cards[currentIndex].score == 0;
    pickNewCard()
    startTimer()
}
function actionLeft(){
    stopTimer();
    cards[currentIndex].score += 10;
    pickNewCard()
    startTimer()
}
function actionUp(){
    stopTimer();
    cardComp.classList.toggle("show");
}

function startGame(){
    window.addEventListener('keydown', (e) => {
        if (e.code === "ArrowRight") {
            actionRight();
        }
        if (e.code === "ArrowLeft") {
            actionLeft();
        }
        if (e.code === "ArrowUp") {
            actionUp();
        }
    });
    
    let touchStartX
    let swipeThresh = 100;
    cardComp.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    })
    cardComp.addEventListener('touchmove', (e) => {
        let dif = e.changedTouches[0].clientX - touchStartX;
        cardComp.style.transform = `translateX(${dif}px)`;
    })
    cardComp.addEventListener('touchend', (e) => {
        let dif = e.changedTouches[0].clientX - touchStartX;
        cardComp.style.transform = `translateX(${0}px)`;
        if (dif > swipeThresh)
            actionRight();
        else if (dif < -swipeThresh)
            actionLeft();
        else
            actionUp();
    })
}