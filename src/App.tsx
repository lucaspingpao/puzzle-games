import { HashRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar'
import Home from './Home'
import Queens from './games/Queens/Queens'
import Wordle from './games/Wordle/Wordle'

function App() {
  return (
    <HashRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/queens" element={<Queens />}/>
        <Route path="/wordle" element={<Wordle />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
