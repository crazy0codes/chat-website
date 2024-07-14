import { useEffect } from 'react';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3001');

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  }, []);
  return (
    <Dashboard />
  );
}

export default App;
