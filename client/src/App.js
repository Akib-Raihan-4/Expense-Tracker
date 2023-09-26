
import './App.css';
import ChartComp from './components/chartComp';


function App() {
  return (
    <div className="App">
      <div className='container mx-auto max-w-6xl text-center drop-shadow-lg'>
        <h1 className='text-4xl py-8 mb-10 bg-slate-800 text-white'>Expense Tracker</h1>

        {/* grid columns */}
        <div className='grid md:grid-cols-2 gap-4'>
          {/* Char */}
          {/* Form */}
          <ChartComp/>

        </div>

      </div>
    </div>
  );
}

export default App;
