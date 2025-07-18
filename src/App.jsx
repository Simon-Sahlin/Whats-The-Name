import { useEffect, useState, useCallback } from 'react';

const images = import.meta.glob("./assets/*", { eager: true });
const cards = Object.entries(images).map(([path, mod]) => {
  const fileName = path.split("/").pop();
  return {
    fileName,
    url: mod.default,
  };
});

function App() {
  
  // const [entries, updateEntries] = useState(() => {
  //   return Object.entries(images).map(([path, mod], i) => {
  //     const fileName = path.split("/").pop();
  //     return {
  //       index: i,
  //       fileName,
  //       url: mod.default,
  //       score: 10
  //     };
  //   });
  // })
  // const [showCard, updateShow] = useState(false);
  // const [card, updateCard] = useState(entries[0]);

  // function pickNewCard(){
  //   updateShow(false);
  //   updateCard(entries[Math.floor(Math.random() * entries.length)])
  //   // console.log(entries)
  // }

  // function updateScore(dif) {
  //   updateEntries(prevEntries => {
  //     // console.log("SNOPP")
  //     const updated = [...prevEntries];
  //     // console.log(updated)
  //     updated[card.index] = {
  //       ...updated[card.index],
  //       score: updated[card.index].score + dif,
  //     }
  //     // console.log(updated)
  //     return updated;
  //   });
  // }


  // useEffect(()=>{
  //   function handleKeyPress(e){
  //     if (e.code === "ArrowUp") {
  //       updateShow(prev => !prev);
  //     }
  //     else if (e.code === "ArrowRight") {
  //       updateScore(-5)
  //       pickNewCard();
  //     }
  //   }

  //   pickNewCard();
  //   window.addEventListener('keydown', handleKeyPress);
  //   return () => window.removeEventListener('keydown', handleKeyPress);
  // }, [])




  const [cardIndex, setIndex] = useState(0)
  const [scores, setScores] = useState(Array(cards.length).fill(10))

  const pickNewCard = useCallback(() => {
    // let rand = Math.floor(Math.random() * cards.length)
    // setIndex(rand);
    let sum = 0;
    scores.forEach(c => {
      sum += c;
    });
    console.log(sum)
    let rand = Math.floor(Math.random() * sum)
    let index = -1;
    while (rand > 0) {
      index++;
      rand -= scores[index];
    }
    console.log(index)
    setIndex(index);
  }, [scores])

  const handleKeyPress = useCallback((e) => {
    if (e.code === "ArrowUp") {
      // updateShow(prev => !prev);
      console.log("Uuuh")
      updateScore(cardIndex, -5);
    }
    else if (e.code === "ArrowRight") {
      // updateScore(-5)
      pickNewCard()
    }
  }, [cardIndex, pickNewCard])

  function updateScore(i, dif){
    setScores(oldScores => {
      let newScores = [...oldScores];
      newScores[i] += dif;
      return newScores;
    })
  }



  useEffect(()=>{
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress])
  
  return (
    <>
      <div className="flex flex-col h-screen bg-zinc-800">
        <div className="flex items-center justify-center p-7">
          <h1 className="text-white font-bold text-4xl">Whats The Name?</h1>
        </div>
        <div className="flex items-center justify-center grow">
          <div 
            className='aspect-square w-[min(80vw,80vh)] bg-cover bg-center rounded-full bg-zinc-700 flex items-center justify-center'
            style={{ backgroundImage: `url(${!false ? cards[cardIndex].url : ""})` }}
          >
            {false && <h2 className="text-white font-bold text-7xl text-center">{cards[cardIndex].fileName}</h2>}
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <p className="text-slate-500 text-xl">You are doing great! ({scores[cardIndex]})</p>
        </div>
      </div>
    </>
  )
}

export default App
