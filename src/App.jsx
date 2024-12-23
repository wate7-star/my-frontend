import React from "react"
import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sell from "./components/Sell"
import ItemDetails from "./components/ItemDetails"




function App(){

  return(
   <Router>
            
            <Routes>
              <Route path="/" element={ <Navbar/>} />
              <Route path="/post" element={ <Sell/> } />  
              <Route path="/items/:id" element={<ItemDetails />} />
            </Routes>
   </Router>
  )
}
export default App