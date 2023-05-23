import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "../pages/admin/Admin";
import Login from "../pages/Login/Login";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;