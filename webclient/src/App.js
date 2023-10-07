import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import './styles/common.css'
import CustomerPage from './pages/CustomerPage';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TravelerManagementPage from './pages/TravelerManagementPage';
import TrainManagementPage from './pages/TrainManagementPage';


function App() {

  // const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
  const [isLogged, setIsLogged] = useState("true");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [username, setUserName] = useState(sessionStorage.getItem("username"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  return (
    <div style={{ height: '100vh', overflow:'hidden' }}>
      {isLogged == "true" ?
        <>
          <div className='row' style={{ height: '100%', margin: '0%' }}>
            <Router >
              <NavBar />
              <div className="col-lg-10" style={{ margin: '0%', padding: '0%' }}>
                <Routes>
                  <Route exact path='/travelerManagement' element={<TravelerManagementPage />} />
                  <Route exact path='/trainManagement' element={<TrainManagementPage />} />
                </Routes>
              </div>
            </Router>
          </div>
        </> :
        <>
          <Router >
            <Routes>
              <Route exact path='/login' element={<LoginPage />} />
            </Routes>
          </Router>
        </>
      }

      <ToastContainer />
    </div>

  );
}

export default App;
