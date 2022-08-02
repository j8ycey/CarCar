import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import InventoryList from './InventoryList';
// import ManufacturerForm from './ManufacturerForm';
// import ModelForm from './ModelForm';
// import CarForm from './CarForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/inventory" element={<InventoryList />} />
          {/* <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/models/new" element={<ModelForm />} />
          <Route path="/cars/new" element={<CarForm />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
