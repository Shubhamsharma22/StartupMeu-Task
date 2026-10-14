import React from 'react'
import { useState } from 'react'
import Register from './UserPages/Register'
import Login from './UserPages/Login'
import Dashboard from './ToDoPages/Dashboard.jsx'
import Addtask from './ToDoPages/Addtask.jsx'
import EditTask from './ToDoPages/EditTask.jsx'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'

const App = () => {
 
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handlelogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route 
          path="/login" 
          element={!token ? <Login onLoginsuccess={setToken} /> : <Navigate to="/Register" />} 
        />
       <Route 
      path="/Register" 
      element={!token ? <Register /> : <Navigate to="/Dashboard" />} 
    />
        
<Route 
      path="/Dashboard" 
      element={token ? <Dashboard onLogout={handlelogout} /> : <Navigate to="/login" />} 
    />
       <Route 
      path="/Addtask" 
      element={token ? <Addtask /> : <Navigate to="/login" />} 
    />
       <Route
      path="/EditTask/:id"
      element={token ? <EditTask /> : <Navigate to="/login" />}
    />

    <Route 
      path="*" 
      element={<Navigate to={token ? "/Dashboard" : "/login"} />} 
    />
       

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
