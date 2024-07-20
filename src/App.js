import { useEffect, useState } from 'react';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { LoginForm } from './pages/LoginForm';

function App() {
  
  const [token, setToken] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token')
    console.log(token)
    if (Boolean(token)) {
      setToken(Boolean(token))
    }
  }, []);

  return (
    <>
      {console.log("Token :", token)}
      {!token ? <LoginForm props={{ setToken }} /> : <Dashboard props={{ setToken }} />}
    </>
  )
}

export default App;
