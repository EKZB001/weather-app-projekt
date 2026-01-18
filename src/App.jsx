import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Details from './Details'; // Importujemy nowy plik
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:city" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;