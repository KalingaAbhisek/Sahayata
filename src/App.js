import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import InitialHome from './components/Home/InitialHome';
import MainHome from './components/HomeContent/MainHome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<InitialHome />} />
      <Route path="/home" element={<MainHome />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
