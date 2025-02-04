import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Status from "./pages/Status";

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <nav className="my-4 space-x-4">
          <Link to="/" className="text-blue-500">
            Home
          </Link>
          <Link to="/status" className="text-blue-500">
            Status
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
