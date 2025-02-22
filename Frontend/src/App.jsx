import { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { About } from './pages/About';
import axios from "axios";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

function App() {
  const [mapLocation, setMapLocation] = useState({ lat: 57.17, lng: -2.2 });
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.8.171:50892/encounter/fetch");
        const formattedData = response.data.map(item => ({
          ...item,
          position: {
            lat: item.lat,
            lng: item.lng
          }
        }));
        setMockData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ setMapLocation, mapLocation, mockData }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<h1>404, Page not found!</h1>} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
export { useAppContext };
