
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // ←パスが合ってるかチェック！
import Home from './pages/Home'; 
import ProfileSetup from './pages/ProfileSetup';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setup" element={<ProfileSetup />} />
      </Routes>
    </Router>
  );
}

export default App;
/*
// App.js
import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>こんにちは、{user.username}さん！</h1>
          <button onClick={signOut}>サインアウト</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
*/



