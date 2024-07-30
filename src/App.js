import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import AccountPage from './components/AccountPage';
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/account" element={<AccountPage/>} />
      </Routes>
    </div>
  );
}
// onst App = () => (
//   <Router>
//     <ErrorBoundary>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/pets/:id" element={<PetDetailPage />} />
//       </Routes>
//     </ErrorBoundary>
//   </Router>
// );

export default App;
