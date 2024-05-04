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
  const [initialLoad, setInitialLoad] = useState(pathname === '/' || pathname === '/home' || pathname === '/contests' || pathname === '/video' || pathname === '/video/dsa'? true: false);
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
      <Route exact path="/" element={user?<Navigate to='/home'/>:<InitialHome/>} />
      <Route exact path="/home" element={<MainHome />} />
      <Route exact path="/contests" element={<CodingContest />} />
      <Route exact path="/video" element={<PlayerAndList playlistId="PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY"/>} />
      <Route exact path="/video/dsa" element={<PlayerAndList playlistId="PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn"/>} />
      <Route path="*" element={<Navigate to='/'/>} />
    </Routes>
  );
}

export default App;

