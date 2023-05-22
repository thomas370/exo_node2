import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "../pages/Admin";
import Login from "../pages/Login";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;