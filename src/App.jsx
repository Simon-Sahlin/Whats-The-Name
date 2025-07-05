import fish2 from './assets/fish2.jpg';

function App() {
  return (
    <>
      <div className="flex flex-col h-screen bg-zinc-800">
        <div className="flex items-center justify-center p-7">
          <h1 className="text-white font-bold text-4xl">Whats The Name?</h1>
        </div>
        <div className="flex items-center justify-center grow">
          <div 
            className='aspect-square w-[min(80vw,80vh)] bg-cover bg-center rounded-full bg-zinc-700 flex items-center justify-center'
            style={{ backgroundImage: `url(${fish2})` }}
          >
            <h2 className="text-white font-bold text-7xl text-center">Whats The Name? yeaheahea</h2>
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
