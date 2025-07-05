import { useEffect, useState } from 'react';

const images = import.meta.glob("./assets/*", { eager: true })
const imageList = Object.values(images).map(mod => mod.default);

function App() {
  
  const [showCard, updateCard] = useState(true);
  const [cardImage, updateCardImage] = useState(imageList[1]);

  useEffect(()=>{
    function handleKeyPress(e){
      if (e.code === "ArrowUp") {
        updateCard(prev => !prev);
      }
      else if (e.code === "ArrowRight") {
        updateCardImage(imageList[Math.floor(Math.random() * imageList.length)]);
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
            {showCard && <h2 className="text-white font-bold text-7xl text-center">{cardImage.split("/").at(-1).split(".")[0]}</h2>}
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
