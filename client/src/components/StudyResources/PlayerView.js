import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../../firebase';
import './PlayerView.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayerAndList from './PlayerAndList';
import axios from 'axios';
import Aptitude from '../Aptitude/Aptitude';
import CoreSubjects from '../Semester Materials/CoreSubjects';

const PlayerView = () => {
  const [user, setUser] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/'); 
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const location = useLocation();
  const {pathname} = location;
  console.log(pathname)
  const query = useQuery();
  const topic = query.get('topic');
  const playlistId = query.get('playlistId');

  useEffect(() => {
    const fetchData = async ()=> {
        if (topic && playlistId) {
            const response = await axios.get(`https://sahayata-backend-b12m.onrender.com/api/dsa/${topic}`);
            if (response) {
              const arrItems = response.data.flatMap((section) => section.items);
              setPlaylistItems(arrItems);
              if (arrItems.length > 0) {
                setCurrentVideoId(arrItems[0].snippet.resourceId.videoId);
              }
            } else {
              console.error('No response data found in local storage');
            }
        }
    }
    fetchData();
  }, [topic, playlistId]);

  const handleVideoClick = useCallback((videoId) => {
    setCurrentVideoId(videoId);
  }, []);

  const renderedVideo = useMemo(() => {
    if (!currentVideoId) return null;
    return (
      <iframe className='playiframe'
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${currentVideoId}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );
  }, [currentVideoId]);

  const renderedPlaylist = useMemo(() => {
    return playlistItems.map((item) => (
      <li className="playviewli" key={item.snippet.resourceId.videoId} onClick={() => handleVideoClick(item.snippet.resourceId.videoId)}>
        {item.snippet.title}
      </li>
    ));
  }, [playlistItems, handleVideoClick]);

  return (
<>
  {topic && playlistId && (pathname === '/dsa' || pathname === '/aptitude' || pathname === '/core-subjects') ? (
    <div className="bodyPlayerView">
      <h1 id="playerTitle" className="center-text">{`Welcome to ${topic} Playlist`}</h1>
      <div className='container-player'>
        <div id="player-left-side">
          <div id="videoPlayer">{renderedVideo}</div>
        </div>
        <div id="player-right-side">
          <ul id="playlist">{renderedPlaylist}</ul>
        </div>
      </div>
    </div>
  ) : pathname === '/aptitude' ? (
    <Aptitude />
  ) : pathname === '/dsa' ? (
    <PlayerAndList />
  ) : pathname === '/core-subjects' ? (
    <CoreSubjects />):null}
</>
  );
};

export default React.memo(PlayerView);
