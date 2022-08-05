import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Inventory from './Inventory';
import Appointments from './Appointments';
import Employees from './Employees';
import Sales from './Sales';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/appointment" element={<Appointments />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
