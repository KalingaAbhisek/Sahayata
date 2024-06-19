import './App.css';
import {Routes,Route,useLocation,Navigate} from 'react-router-dom'
import InitialHome from './components/Home/InitialHome';
import MainHome from './components/HomeContent/MainHome';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { Box,CircularProgress } from '@mui/material';
import CodingContest from './components/CodingContestCalender/CodingContest';
import PlayerView from './components/StudyResources/PlayerView';
import SemesterMaterials from './components/Semester Materials/SemesterMaterials';
import Roadmap from './components/roadmaps/Roadmap';
import JobPortal from './components/JOB Portal/JobPortal';

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
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
      <Route exact path="/" element={<InitialHome/>} />
      <Route exact path="/home" element={<MainHome />} />
      <Route exact path="/contests" element={<CodingContest />} />
      <Route path="/aptitude" element={<PlayerView />} />
      <Route path="/core-subjects" element={<PlayerView />} />
      <Route exact path="/roadmaps" element={<Roadmap />} />
      <Route exact path="/jobs" element={<JobPortal />} />
      <Route exact path="/semester-materials" element={<SemesterMaterials />} />
      <Route path="/dsa" element={<PlayerView />} />
      <Route path="*" element={<Navigate to='/'/>} />
    </Routes>
  );
}

export default App;

