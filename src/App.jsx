import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PresetDetails from './pages/PresetDetails';
import Home from './pages/Home';
import Presets from './pages/Presets';
import Grading from './pages/Grading';


// ... other imports

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presets" element={<Presets />} />
          <Route path="/presets/:section/:preset" element={<PresetDetails />} />
          <Route path="/grading/:section/:grading" element={<Grading />} />
          {/* other routes */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
