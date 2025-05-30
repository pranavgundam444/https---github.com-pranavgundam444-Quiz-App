import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path = "/" element={<Home/>} />
          <Route exact path='/Quiz' element={<Quiz/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
