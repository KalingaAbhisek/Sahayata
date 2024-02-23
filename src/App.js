import './App.css';
import {Routes,Route,useLocation,Navigate} from 'react-router-dom'
import InitialHome from './components/Home/InitialHome';
import MainHome from './components/HomeContent/MainHome';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { Box,CircularProgress } from '@mui/material';

function App() {
  const {pathname} = useLocation();
  const [initialLoad, setInitialLoad] = useState(pathname === '/' || pathname === '/home'? true: false);
  const [user, setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
      setInitialLoad(false)
    })
  },[])

  if(initialLoad){
    <Box mt={5} display='flex' justifyContent='center'>
      <CircularProgress />
    </Box>
  }
  return (
    <Routes>
      <Route exact path="/*" element={user?<Navigate to='/home'/>:<InitialHome/>} />
      <Route path="/home" element={user?<MainHome />:<Navigate to='/'/>} />
    </Routes>
  );
}

export default App;
