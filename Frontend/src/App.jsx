import { useState, createContext, useContext } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { About } from './pages/About';

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

function App() {
  const [mapLocation, setMapLocation] = useState({lat: 57, lng: -2.4});
  const [mockData, setMockData] = useState([
        {
            position: { lat: 57.1, lng: -2.5 },
            animal: "leopard",
            type: "cat",
        },
        {
            position: { lat: 57.2, lng: -2.6 },
            animal: "woodpecker",
            type: "bird",
        },
        {
            position: { lat: 57.3, lng: -2.9 },
            animal: "great dane",
            type: "dog",
        },
        {
            position: { lat: 50, lng: 20 },
            animal: "great dane",
            type: "dog",
        },
        {
          position: { lat: 52, lng: 21 },
          animal: "silverback",
          type: "mammel",
        },
        {
          position: { lat: 54, lng: 23 },
          animal: "silverback",
          type: "mammel",
        }
    ])

  return (
    <AppContext.Provider value={{ setMapLocation, mapLocation, mockData }}>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='*' element={<h1>404, Page not found!</h1>}/>
      </Routes>
    </Router>
    </AppContext.Provider>
  )
}

export default App
export { useAppContext }
