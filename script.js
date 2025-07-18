const cardComp = document.querySelector(".card")
const cardText = document.querySelector(".card>h2")
const progressBar = document.querySelector("#progressBar>#innerBar")
const progressText = document.querySelector("#progressBar>#text>p")


// const input = document.getElementById('folderInput');
// input.addEventListener('change', () => {
//     const files = Array.from(input.files);
//     imageFiles = files.filter(file => file.type.startsWith('image/'));

//     console.log(imageFiles); // Array of File objects
// });

// let imageFiles = null;

let imageFiles = [
    `assets/cards/Balderado/Agnes_Billing.jpg`,
    `assets/cards/Balderado/Alexandra Strandberg.jpg`,
    `assets/cards/Balderado/Alfred 'Affe' Moberg Ericsson.jpg`,
    `assets/cards/Balderado/Alma Ahner.jpg`,
    `assets/cards/Balderado/Alma Garplid.jpg`,
    `assets/cards/Balderado/Anton 'Eken' Ekström.jpg`,
    `assets/cards/Balderado/Benjamin Bobeck.jpg`,
    `assets/cards/Balderado/Caroline_'Carro'_Mathiesen.jpg`,
    `assets/cards/Balderado/Casper Rozman.jpg`,
    `assets/cards/Balderado/Dexter_Clemensson.jpg`,
    `assets/cards/Balderado/Ellen_Chrona.jpg`,
    `assets/cards/Balderado/Emelie Skoglund.jpg`,
    `assets/cards/Balderado/Greta Lovell.jpg`,
    `assets/cards/Balderado/Iris Viktualia Vihma.jpg`,
    `assets/cards/Balderado/Isak_Cronvall.jpg`,
    `assets/cards/Balderado/Jacob Hulten.jpg`,
    `assets/cards/Balderado/Jennifer Larsson.jpg`,
    `assets/cards/Balderado/Leon Dimidis.jpg`,
    `assets/cards/Balderado/Linus 'Lars' Larsson.jpg`,
    `assets/cards/Balderado/Lovisa Sturve.jpg`,
    `assets/cards/Balderado/Lucas Svehla.jpg`,
    `assets/cards/Balderado/Melissa Duman.jpg`,
    `assets/cards/Balderado/Noah Kristiansson.jpg`,
    `assets/cards/Balderado/Nora Kayode Stålklinga.jpg`,
    `assets/cards/Balderado/Nova Ahlinder.jpg`,
    `assets/cards/Balderado/Sebastian Salmi.jpg`,
    `assets/cards/Balderado/Tristan_Ferry.jpg`,
    `assets/cards/Balderado/Ville Vikingsson.jpg`
]

let cards = imageFiles.map(path => {
    const name = path.split("/").pop();
    return {
        name,
        url: encodeURI(path),
        score: 10
    }
})

let absoluteMax = 0;
function pickNewCard(){

    console.log("Picking new card")

    let cumScores = [];
    for (let i = 0; i < cards.length; i++){
        cumScores[i] = cards[i].score + (cumScores[i-1] || 0);
    }
    const max = cumScores[cumScores.length - 1]
    const rand = max * Math.random();
    console.log({max, cumScores, rand})
    for (let i = 0; i < cumScores.length; i++){
        if (cumScores[i] >= rand){
            currentIndex = i;
            break
        }
    }
    console.log(currentIndex)

    if (max > absoluteMax) absoluteMax = max
    let percentage = 100 - (100*max/absoluteMax)
    if (percentage > 100) percentage = 100;
    progressBar.style.setProperty("width", `${percentage}%`)
    progressText.innerHTML = Math.round(percentage) + "%"

    cardComp.classList.remove("show");
    showing = false;
    cardComp.style.setProperty("background-image", `url("${cards[currentIndex].url}")`);
    cardText.innerHTML = cards[currentIndex].name;
}


let currentIndex = 0;
let showing = false;
let timerStart = Date.now();
let timerStop = 0;
window.addEventListener('keydown', (e) => {
    if (e.code === "ArrowRight") {
        if (timerStop == 0)
            timerStop = Date.now();
        console.log("Cool!" + (timerStop - timerStart) + " your score would be: " + (7.5*Math.E**(-0.2*(timerStop - timerStart)*0.001) + 4))
        cards[currentIndex].score -= (7.5*Math.E**(-0.2*(timerStop - timerStart)*0.001) + 4);
        if (cards[currentIndex].score < 0)
            cards[currentIndex].score == 0;
        pickNewCard()
        timerStart = Date.now();
        timerStop = 0;
    }
    if (e.code === "ArrowLeft") {
        if (timerStop == 0)
            timerStop = Date.now();
        cards[currentIndex].score += 10;
        pickNewCard()
        timerStart = Date.now();
        timerStop = 0;
    }
    
    if (e.code === "ArrowUp") {
        if (timerStop == 0)
            timerStop = Date.now();
        console.log("Cool!" + (timerStop - timerStart) + " your score would be: " + (7.5*Math.E**(-0.2*(timerStop - timerStart)*0.001) + 4))
        
        cardComp.classList.toggle("show");
        cardComp.style.setProperty("background-image", `url("${showing ? cards[currentIndex].url : ''}")`);
        showing = !showing;
    }
});