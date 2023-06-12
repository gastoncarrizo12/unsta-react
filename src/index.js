import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar, Footer} from './pages/layout';
import { Home } from './pages/inicio';
import { Tutoriales } from './pages/tutorial';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App () {
  return(
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tutorial' element={<Tutoriales />} />
    </Routes>
    <Footer />
    </BrowserRouter>
   
    </>
      
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
