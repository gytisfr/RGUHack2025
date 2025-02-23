import { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { IndividualSighting } from './components/IndividualSighting';
import axios from "axios";
import { Login } from './pages/Login';
import { Register } from "./pages/Register";
import Cookies from "js-cookie";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

function App() {
  const [mapLocation, setMapLocation] = useState({ lat: 57.17, lng: -2.2 });
  const [mockData, setMockData] = useState([]);
  const [loggedUser, setLoggedUser] = useState(Cookies.get("username") || null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.rguhacknature.co.uk/encounter/fetch");
        const formattedData = response.data.map(item => ({
          ...item,
          position: {
            lat: item.lat,
            lng: item.lng
          }
        }));
        console.log(formattedData)
        setMockData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateMockData = (updatedData) => {
    setMockData(updatedData);
  };

  return (
    <AppContext.Provider value={{ setMapLocation, mapLocation, mockData, loggedUser, setLoggedUser, updateMockData }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sighting/:id' element={<IndividualSighting />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<h1>404, Page not found!</h1>} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
export { useAppContext };
