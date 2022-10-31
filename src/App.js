import './App.css';
import React from 'react'
import {BrowserRouter,Routes,Route,} from "react-router-dom"
import Home from './pages/home/home'
import Employee from './pages/employee/employee'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='*' element={<Error />}></Route> */}
        <Route path='/employee' element={<Employee />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
