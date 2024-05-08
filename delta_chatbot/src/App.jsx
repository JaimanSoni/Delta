import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing_Page from "./screen/Landing_Page"


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing_Page />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
