import { useEffect, useState } from 'react';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { LoginForm } from './pages/LoginForm';

function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token') || null
    let stu_email = localStorage.getItem('stu_email') || null
    let username = "";
    if (Boolean(token)) {
      setUser({ token : token, stu_email, username })
    }
  }, []);

  return (
    <>
      {console.log("User", user)}
      {!(user && user.token) ? <LoginForm props={{ setUser }} /> : <Dashboard props={{ setUser , user}} />}
    </>
  )
}

export default App;