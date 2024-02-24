import './App.css';
import {Routes,Route,useLocation,Navigate} from 'react-router-dom'
import InitialHome from './components/Home/InitialHome';
import MainHome from './components/HomeContent/MainHome';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { Box,CircularProgress } from '@mui/material';
import PlayerAndList from './components/StudyResources/PlayerAndList';
import CodingContest from './components/CodingContestCalender/CodingContest';

function App() {
  const {pathname} = useLocation();
  const [initialLoad, setInitialLoad] = useState(pathname === '/' || pathname === '/home' || pathname === '/contests' || pathname === '/video'? true: false);
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
      <Route path='/' element={user?<Navigate to='home' replace/>:<InitialHome/>} />
      <Route path='/home' element={user?<MainHome />:<Navigate to='/' replace/>} />
      <Route exact path='/contests' element={user?<CodingContest />:<Navigate to='/' replace/>} />
      <Route path='/video' element={user?<PlayerAndList playlistId="PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY"/>:<Navigate to='/' replace/>} />
    </Routes>
  );
}

export default App;
