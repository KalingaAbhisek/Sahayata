import React, { useEffect, useState, useCallback, memo } from 'react';
import './PlayerAndList.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import SignOut from '../Navigation/SignOut';
import axios from 'axios';

const PlayerAndList = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/'); // Redirect to landing page if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  const redirectToPlaylist = useCallback(async (playlistName) => {
    try {
      const response = await axios.get(`https://sahayata-backend-b12m.onrender.com/api/dsa/${playlistName}`);
      const playlistId = response.data[0].items[0].snippet.playlistId;
      window.open(`/dsa?topic=${playlistName}&playlistId=${playlistId}`, '_blank');
    } catch (error) {
      console.error('Error fetching:', error);
    }
  }, []);

  return (
    <div className='bodyPlayerAndList'>
      <header className='playerandlistheader'>
        <div className="header-left-pl">
          <h1 className='plli'><a className='pla' href="/">SAHAYATA</a></h1>
          <p className='plp'>A comprehensive portal.</p>
        </div>
        <nav className="header-right-pl">
          <ul className='plul'>
            <li className='plli'><a className='pla' href="../index.html">Home</a></li>
            <SignOut />
          </ul>
        </nav>
      </header>
      <div className="containerpll">
        <div className="pl-row">
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('introduction')}>Introduction</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('maths')}>Maths</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('recursion')}>Recursion</div>
          </div>
        </div>
        <div className="pl-row">
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('arrays')}>Arrays</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('linked-list')}>Linked-list</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('binary-search')}>Binary Search</div>
          </div>
        </div>
        <div className="pl-row">
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('two-pointer')}>Two Pointer</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('bit-manipulation')}>Bit-manipulation</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('tries')}>Tries</div>
          </div>
        </div>
        <div className="pl-row">
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('stack-and-queues')}>Stack and Queues</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('greedy')}>Greedy</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('heap')}>Heap</div>
          </div>
        </div>
        <div className="pl-row">
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('trees')}>Trees</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('dynamic-programming')}>Dynamic Programming</div>
          </div>
          <div className="pl-col">
            <div className="topic-pl" onClick={() => redirectToPlaylist('graph')}>Graph</div>
          </div>
        </div>
      </div>
      <footer className='playerandlistfooter'>
        <div className="containerpll">
          <p className='plp'>&copy; 2024 Sahayata. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default memo(PlayerAndList);
