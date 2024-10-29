import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar'
import Home from './Home'
import Queens from './games/Queens/Queens'

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/queens" element={<Queens />}/>
      </Routes>
    </Router>
  )
}

export default App
