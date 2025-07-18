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
    `assets/Balderado/Agnes_Billing.jpg`,
    `assets/Balderado/Alexandra Strandberg.jpg`,
    `assets/Balderado/Alfred 'Affe' Moberg Ericsson.jpg`,
    `assets/Balderado/Alma Ahner.jpg`,
    `assets/Balderado/Alma Garplid.jpg`,
    `assets/Balderado/Anton 'Eken' Ekström.jpg`,
    `assets/Balderado/Benjamin Bobeck.jpg`,
    `assets/Balderado/Caroline_'Carro'_Mathiesen.jpg`,
    `assets/Balderado/Casper Rozman.jpg`,
    `assets/Balderado/Dexter_Clemensson.jpg`,
    `assets/Balderado/Ellen_Chrona.jpg`,
    `assets/Balderado/Emelie Skoglund.jpg`,
    `assets/Balderado/Greta Lovell.jpg`,
    `assets/Balderado/Iris Viktualia Vihma.jpg`,
    `assets/Balderado/Isak_Cronvall.jpg`,
    `assets/Balderado/Jacob Hulten.jpg`,
    `assets/Balderado/Jennifer Larsson.jpg`,
    `assets/Balderado/Leon Dimidis.jpg`,
    `assets/Balderado/Linus 'Lars' Larsson.jpg`,
    `assets/Balderado/Lovisa Sturve.jpg`,
    `assets/Balderado/Lucas Svehla.jpg`,
    `assets/Balderado/Melissa Duman.jpg`,
    `assets/Balderado/Noah Kristiansson.jpg`,
    `assets/Balderado/Nora Kayode Stålklinga.jpg`,
    `assets/Balderado/Nova Ahlinder.jpg`,
    `assets/Balderado/Sebastian Salmi.jpg`,
    `assets/Balderado/Tristan_Ferry.jpg`,
    `assets/Balderado/Ville Vikingsson.jpg`
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