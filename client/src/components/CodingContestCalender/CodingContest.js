import React, { useState, useEffect, memo } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './CodingContestCSS.css';
import SignOut from '../Navigation/SignOut';

const CodingContest = () => {
  const [user, setUser] = useState(null);
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('https://sahayata-backend-b12m.onrender.com/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const now = new Date();

        const parseDate = (dateString) => {
          const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
          return new Date(cleanedDateString);
        };

        const upcomingContests = data.filter(contest => parseDate(contest.start) >= now);
        upcomingContests.sort((a, b) => parseDate(a.start) - parseDate(b.start));
        setContests(upcomingContests);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        console.log('Error fetching data:', error);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className='coding-contest'>
      <header className='coding-contest-header'>
        <div className="header-left-cc">
          <h1 className='coding-contest-h1'><a className="coding-contest-a" href="/"><b>SAHAYATA</b></a></h1>
          <p className='coding-contest-p'>A comprehensive portal.</p>
        </div>
        <nav className="header-right-cc">
          <ul className='coding-contest-ul'>
            <li className='coding-contest-li'><a className="coding-contest-a" href="/">Home</a></li>
            <SignOut />
          </ul>
        </nav>
      </header>
      <div className="containercc" id="contestSchedule">
        {error && <div>{error}</div>}
        {contests.map((contest, index) => (
          <div key={index} className="cardcc">
            <div className="card-title-cc">{contest.event}</div>
            <div className="card-details-cc">
              <div>Start: {contest.start}</div>
              <div>End: {contest.end}</div>
            </div>
            <a className="coding-contest-a" href={contest.href} target="_blank" rel="noopener noreferrer">{contest.host}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(CodingContest);
