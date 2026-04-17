import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import EditorWrapper from './components/Editor/EditorWrapper';
import Navbar from './components/LandingPage/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
