import { useEffect, useState } from 'react';

const images = import.meta.glob("./assets/*", { eager: true });
const imageEntries = Object.entries(images).map(([path, mod]) => {
  const fileName = path.split("/").pop();
  return {
    fileName,
    url: mod.default
  };
});
const imageList = imageEntries.map(entry => entry.url);
const fileNames = imageEntries.map(entry => entry.fileName);

function App() {
  
  const [showCard, updateCard] = useState(true);
  const [cardImage, updateCardImage] = useState(imageList[0]);
  const [cardName, updateCardName] = useState(fileNames[0]);

  useEffect(()=>{
    function handleKeyPress(e){
      if (e.code === "ArrowUp") {
        updateCard(prev => !prev);
      }
      else if (e.code === "ArrowRight") {
        const rand = Math.floor(Math.random() * imageList.length);
        updateCardImage(imageList[rand]);
        updateCardName(fileNames[rand]);
        updateCard(false);
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
            style={{ backgroundImage: `url(${!showCard ? cardImage : ""})` }}
          >
            {showCard && <h2 className="text-white font-bold text-7xl text-center">{cardName}</h2>}
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
