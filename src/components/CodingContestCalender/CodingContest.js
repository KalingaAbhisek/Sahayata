import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {API_KEY} from '../../firebase';
const CodingContest = () => {
  const [contests, setContests] = useState([]);
  const changeUTCToIST = (utcDateTime)=>{
    const utcTime = new Date(utcDateTime).getTime();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = utcTime + istOffset;
    const istDateTime = new Date(istTime)
    return istDateTime
  }
  useEffect(() => {
    const fetchUpcomingContests = async () => {
      try {
        const response = await axios.get(`https://clist.by/api/v4/contest/?upcoming=true&username=adskguest&api_key=${API_KEY}`);
        const changedUTCToIST = response.data.objects.map(contest=>({
          ...contest,
          start: changeUTCToIST(contest.start),
          end: changeUTCToIST(contest.end)
        }))
        const filteredContests = changedUTCToIST.filter(contest => {
          const contestYear = contest.start.getFullYear();
          return contestYear >= 2024;
        });
        filteredContests.sort((a, b) => new Date(a.start) - new Date(b.start));
        console.log(filteredContests)
        setContests(filteredContests);
      } catch (error) {
        console.error('Error fetching upcoming contests:', error);
      }
    };

    fetchUpcomingContests();
  }, []);

  return (
    <div>
      <h2>Upcoming Contests</h2>
      <ul>
        {
        
        contests.map(contest => (
          <li key={contest.id}>
            <a target='_blank' href={contest.href}><strong>{contest.event}</strong></a>
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
