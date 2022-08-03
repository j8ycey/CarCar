import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import InventoryList from './InventoryList';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import TechnicianForm from './TechnicianForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/appointment" element={<AppointmentList />} />
          <Route path="/appointment/new" element={<AppointmentForm />} />
          <Route path="/technician/new" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
