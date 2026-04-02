import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AttendanceProvider } from './context/AttendanceContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import FaceRecognition from './pages/FaceRecognition';
import RegisterFace from './pages/RegisterFace';
import AttendanceLog from './pages/AttendanceLog';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AttendanceProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/recognize" element={<FaceRecognition />} />
                <Route path="/register" element={<RegisterFace />} />
                <Route path="/records" element={<AttendanceLog />} />
              </Routes>
            </main>
          </div>
        </AttendanceProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
