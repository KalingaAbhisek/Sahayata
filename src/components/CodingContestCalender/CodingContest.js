import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {auth} from '../../firebase';
import SignOut from '../Navigation/SignOut';
import {useNavigate} from 'react-router-dom'
import { Box,CircularProgress } from '@mui/material';

const CodingContest = () => {
  const [data, setData] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  // const API_KEY = process.env.REACT_APP_CONTEST_API_KEY;
  // const API_URL = `https://clist.by:443/api/v4/contest/?limit=1000&upcoming=true&username=adskguest&api_key=${API_KEY}`
  // const [contests, setContests] = useState([]);
  // const [apiRequested, setapiRequested] = useState(false);
  const changeUTCToIST = (utcDateTime)=>{
    const utcTime = new Date(utcDateTime).getTime();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = utcTime + istOffset;
    const istDateTime = new Date(istTime)
    return istDateTime
  }
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
  }, []);
  // useEffect(()=>{
  //   let interval;
  //   if (user) {
  //     fetchUpcomingContests();
  //     interval = setInterval(fetchUpcomingContests, 10 * 60 * 1000);
  //   } else {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval); 
  // },[user])
  
  useEffect(()=>{
    getCachedData();
    const cachedDataTimestamp = localStorage.getItem('cachedDataTimestamp');
    const currentTime = new Date().getTime();
    if (user && (!cachedDataTimestamp || (currentTime - cachedDataTimestamp) > 10 * 60 * 1000)) {
      fetchUpcomingContests();
    }
  },[user])

  const fetchUpcomingContests = async () => {
    if(!user){
      return
    }
    try {
      const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT_BACKEND}/api/data`);
      const changedUTCToIST = response.data.map(contest=>({
        ...contest,
        start: changeUTCToIST(contest.start),
        end: changeUTCToIST(contest.end)
      }))
      const filteredContests = changedUTCToIST.filter(contest => {
        const contestYear = contest.start.getFullYear();
        const currentDate=new Date();
        return contestYear >= currentDate.getFullYear() && contest.start>=currentDate;
      });
      filteredContests.sort((a, b) => new Date(a.start) - new Date(b.start));
      if(initialLoad){
        <Box mt={5} display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
        setData(filteredContests);
        setInitialLoad(false);
      }
      localStorage.setItem('cachedContestData', JSON.stringify(filteredContests));
      localStorage.setItem('cachedDataTimestamp',new Date().getTime())
    } 
    
    catch (error) {
      console.error('Error fetching upcoming contests:', error);
    }
  }; 

  const getCachedData = () => {
    const cachedData = localStorage.getItem('cachedContestData');
    if (user && cachedData) {
      setData(JSON.parse(cachedData));
    }
  };

  if(!user){
    navigate('/', { replace: true })
    return 
  }

  return (
    <div>
      <h2>Upcoming Contests</h2>
      <SignOut />
      <ul>
        {
        
        data.map(contest => (
          <li key={contest.id}>
            <a target='_blank' rel="noreferrer" href={contest.href}><strong>{contest.event}</strong></a>
            <p>Start Time: {new Date(contest.start).toLocaleString()} IST</p>
            <p>End Time: {new Date(contest.end).toLocaleString()} IST</p>
            <p>Platform: {contest.resource}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodingContest;
