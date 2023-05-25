import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "../pages/admin/Admin";
import Login from "../pages/Login/Login";
import PrivateRoute from "../utils/PrivateRoute";
import Fiche from "../pages/fiche/Fiche";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
                <Route path="/" element={<Login />} />
                <Route path="/material/:id" element={<Fiche />} />
            </Routes>
        </Router>
    );
}

export default App;