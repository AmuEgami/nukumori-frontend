
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // ←パスが合ってるかチェック！
import Home from './pages/Home';
import ProfileSetup from './pages/ProfileSetup';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import ConfirmSignup from "./pages/ConfirmSignup";
import ProfileScreen from './pages/ProfileScreen'; 
Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="/confirm" element={<ConfirmSignup />} />
        <Route path="/profile" element={<ProfileScreen />} />

      </Routes>
    </Router>
  );
}

export default App;



