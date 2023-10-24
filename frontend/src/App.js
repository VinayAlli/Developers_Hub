import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Navbar } from './components/Navbar';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Dashboard} from './pages/Dashboard';
import { Myprofile } from './pages/Myprofile';
import { Individualprofile } from './pages/Individualprofile';


//To know whether user is logined or not
export const AuthContext = createContext();
// To setuser details of paricular user and use those in individual component if know more button is clicked in all profiles page
export const UserdetailsContext = createContext();
function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const login = () => {
    localStorage.setItem('token');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  const [details,setDetails]=useState({})
  return (
    <div>
      <Router>
        <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, login, logout }}>
        <UserdetailsContext.Provider value={{ details,setDetails}}>
        <Navbar/>
        <Routes >
          <Route path='/' Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/dashboard' Component={Dashboard}/>
          <Route path='/myprofile' Component={Myprofile}/>
          <Route path='/individualprofile' Component={Individualprofile}/>
        </Routes>
        </UserdetailsContext.Provider>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
