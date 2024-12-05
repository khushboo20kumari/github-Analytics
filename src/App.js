import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./ComponentGithub/Auth";
import Dashboard from "./ComponentGithub/Dashboard";
import "./App.css";
import ButtonAppBar from "./ComponentGithub/Navbar";
import Footer from "./ComponentGithub/Footer";
function App() {
  const [name, setName] = useState("")
  
  return (
    <>
      <ButtonAppBar/>
      <Router>
        <Routes>
          <Route path="/" element={<Auth name={name} setName={setName} />} />
          <Route path="/dashboard" element={<Dashboard name={name} />} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
