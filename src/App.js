import { useEffect, useState } from 'react';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { LoginForm } from './pages/LoginForm';

function App() {
  
  const [user, setUser] = useState({
    stu_email : null,
    token : null
  });

  useEffect(() => {
    let token = sessionStorage.getItem('token') || null
    let stu_email = sessionStorage.getItem('stu_email') || null
    if (Boolean(token)) {
      setUser(prev => ({ token : token, stu_email }))
    }
  }, []);

  return (
    <>
      {console.log("User", user)}
      {!user.token? <LoginForm props={{ setUser }} /> : <Dashboard props={{ setUser , user}} />}
    </>
  )
}

export default App;
