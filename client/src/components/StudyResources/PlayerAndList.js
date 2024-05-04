import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './PlayerAndList.css';
import {useNavigate} from 'react-router-dom';
import YouTube from 'react-youtube';
import {auth} from '../../firebase';

const PlayerAndList = (props) => {
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const onVideoSelect = (videoId) => {
        setCurrentVideo(videoId);
    };
    const opts = {
        height: '472px',
        width: '100%',
      };
      const [user, setUser] = useState(null)
      const navigate = useNavigate();
      useEffect(() => {
        auth.onAuthStateChanged((user)=>{
          setUser(user);
        })
      }, []);

    useEffect(() => {
      if(user)
        fetchPlaylistVideos();
    }, [user]);

    if(!user){
      navigate('/', { replace: true })
      return 
    }

    const fetchPlaylistVideos = async () => {
      if(!user){
        return
      }
      const playlistId = props.playlistId;
      try {
        const allVideos = [];
        const allVideoArrays = await axios.post('https://us-central1-sahayata-app-1.cloudfunctions.net/app/api/youtube',{playlistId});
        allVideoArrays.data.map((videos)=>{
          videos.items.map((data)=>{
            allVideos.push(data);
          })
        })
        setVideos(allVideos);
        if (allVideos.length > 0) {
          setCurrentVideo(allVideos[0].snippet.resourceId.videoId);
        }
      } catch (error) {
        console.error('Error fetching playlist videos:', error);
      }
    };

  return (
    <div className='body'>
        <h1>
            {

            }
        </h1>
        <div id="left-side">
            <div id="current-video">
                {currentVideo && (
                    <div>
                        <YouTube videoId={currentVideo} opts={opts} />
        </div>
      )}
        </div>
        </div>

        <div id="right-side">
            <h2>Playlist</h2>
            <div>
                {videos.map((video) => (
                    <div key={video.id} onClick={() => onVideoSelect(video.snippet.resourceId.videoId)}>
                        <p className="li">{video.snippet.title}</p>
                     </div>
        ))}
      </div>

        </div>
    </div>
  )
}

export default PlayerAndList