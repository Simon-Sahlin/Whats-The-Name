import { useEffect, useState } from 'react';

const images = import.meta.glob("./assets/*", { eager: true });
const imageEntries = Object.entries(images).map(([path, mod]) => {
  const fileName = path.split("/").pop();
  return {
    fileName,
    url: mod.default
  };
});

function App() {
  
  const [showCard, updateShow] = useState(false);
  const [card, updateCard] = useState(imageEntries[0]);

  useEffect(()=>{
    function handleKeyPress(e){
      if (e.code === "ArrowUp") {
        updateShow(prev => !prev);
      }
      else if (e.code === "ArrowRight") {
        const rand = Math.floor(Math.random() * imageEntries.length);
        updateCard(imageEntries[rand])
        updateShow(false);
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [])
  
  return (
    <>
      <div className="flex flex-col h-screen bg-zinc-800">
        <div className="flex items-center justify-center p-7">
          <h1 className="text-white font-bold text-4xl">Whats The Name?</h1>
        </div>
        <div className="flex items-center justify-center grow">
          <div 
            className='aspect-square w-[min(80vw,80vh)] bg-cover bg-center rounded-full bg-zinc-700 flex items-center justify-center'
            style={{ backgroundImage: `url(${!showCard ? card.url : ""})` }}
          >
            {showCard && <h2 className="text-white font-bold text-7xl text-center">{card.fileName}</h2>}
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <p className="text-slate-500 text-xl">You are doing great!</p>
        </div>
      </div>
    </>
  )
}

export default App
