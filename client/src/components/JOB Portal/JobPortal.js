import React, { useEffect, useState, useCallback,memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './JobPortal.css';

const JobPortal = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
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
    fetchJobListings('SDE, India');
  }, []);

  const fetchJobListings = useCallback(async (query) => {
    try {
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
            'X-RapidAPI-Host': `${process.env.REACT_APP_RAPID_API_HOST}`
          }
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJobs(data.data);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (query.trim() !== '') {
      fetchJobListings(query);
    } else {
      alert('Please enter a search query.');
    }
  }, [query, fetchJobListings]);

  const goBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className='jobportal'>
      <div className="container-job">
        <button id="backButton" onClick={goBack}>HOME</button>
        <div id="searchContainer">
          <input
            type="text"
            id="searchInput"
            placeholder="Enter job title, location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button id="searchButton" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div id="jobListings">
        {jobs.map((job, index) => (
          <div key={index} className="job">
            {job.employer_logo && <img src={job.employer_logo} alt={`${job.employer_name} logo`} />}
            <h2>{job.job_title}</h2>
            <p>Employer: {job.employer_name}</p>
            <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">Apply Now</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(JobPortal);
