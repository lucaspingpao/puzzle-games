import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
// import Home from './Home'
import Queens from './games/Queens/Queens';
import Wordle from './games/Wordle/Wordle';
import TwentyFortyEight from './games/TwentyFortyEight/TwentyFortyEight';
import FooterBar from './components/FooterBar';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Wordle />} />
        <Route path="/queens" element={<Queens />}/>
        <Route path="/wordle" element={<Wordle />}/>
        <Route path="/twentyfortyeight" element={<TwentyFortyEight />}/>
      </Routes>
      <FooterBar />
    </Router>
  )
}

export default App
