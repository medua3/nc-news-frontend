import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/Home"
import ArticlePage from './components/ArticlePage';
import './App.css'
function App(){ 
  return(
  <BrowserRouter> 
  <Routes> 
    <Route path="/" element={<Home/>} />
    <Route path="/articles/:article_id" element={<ArticlePage/>} >  </Route>
    </Routes>
    </BrowserRouter>)

  


}

export default App
