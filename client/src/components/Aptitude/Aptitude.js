import React, { useEffect, useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import SignOut from '../Navigation/SignOut';
import './AptitudeCSS.css';
import axios from 'axios';

const Aptitude = () => {
  const [user, setUser] = useState(null);
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

  const redirectToPlaylist = useCallback(async(playlistName) => {
    try {
        const response = await axios.get(`https://sahayata-backend-b12m.onrender.com/api/dsa/${playlistName}`);
        const playlistId = response.data[0].items[0].snippet.playlistId;
        window.open(`/aptitude?topic=${playlistName}&playlistId=${playlistId}`, '_blank');
      } catch (error) {
        console.error('Error fetching:', error);
      }
  }, []);

  return (
    <div className='aptiBody'>
    <header class="header-section">
        <div class="header-left-section">
            <h1 class="header-title"><a href="../index.html" class="header-title-link"><b>SAHAYATA</b></a></h1>
            <p class="header-description">A comprehensive portal.</p>
        </div>
        <nav class="header-right-section">
            <ul class="navigation-list">
                <li class="navigation-item"><a href="../index.html" class="navigation-link">Home</a></li>
                <SignOut />
            </ul>
        </nav>
    </header>
    <div class="content-container">
        <div class="content-row">
            <div class="content-col">
                <div class="content-card">
                    <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20211116123009/Quantitative-Aptitude-Concepts-Questions-and-Explanation.png" 
                         class="content-card-img" alt="Quantitative-Aptitude" />
                    <div class="content-card-body">
                        <p class="content-card-text"><b>Master the art of problem-solving and numerical reasoning with our comprehensive
                            collection of quantitative aptitude resources.</b></p>
                        <button onClick={() => redirectToPlaylist('quantitative-apti')} class="content-btn-primary">Start Watching</button>
                    </div>
                </div>
            </div>
            <div class="content-col">
                <div class="content-card">
                    <img src="https://i.ytimg.com/vi/u74iQ-VK464/maxresdefault.jpg" class="content-card-img"
                        alt="Logical-reasoning" />
                    <div class="content-card-body">
                        <p class="content-card-text"><b>Sharpen your analytical thinking and logical reasoning abilities through our
                            diverse array of resources.</b></p>
                        <button onClick={() => redirectToPlaylist('reasoning')} class="content-btn-primary">Start Watching</button>
                    </div>
                </div>
            </div>
            <div class="content-col">
                <div class="content-card">
                    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230304225601/Verbal-Ability.png"
                        class="content-card-img" alt="Verbal-ability" />
                    <div class="content-card-body">
                        <p class="content-card-text"><b>Refine your language proficiency and communication skills with our curated
                            selection of verbal ability resources.</b></p>
                        <button onClick={() => redirectToPlaylist('verbal-ability')} class="content-btn-primary">Start Watching</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer-section">
        <div class="footer-container">
            <p class="footer-text">&copy; 2024 Sahayata. All rights reserved.</p>
        </div>
    </footer>
    </div>
  );
};

export default memo(Aptitude);
