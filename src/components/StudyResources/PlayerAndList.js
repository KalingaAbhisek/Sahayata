import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './PlayerAndList.css'
import YouTube from 'react-youtube';

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
    useEffect(() => {
      const fetchPlaylistVideos = async () => {
        try {
          const playlistId = props.playlistId;
          const apiKey = 'AIzaSyC4sxrSOOZ5pvBe0tv5DzTI-tNOfgWT8qI';
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`
          );
          console.log(response)
          setVideos(response.data.items);
          if (response.data.items.length > 0) {
            setCurrentVideo(response.data.items[0].snippet.resourceId.videoId);
          }
        } catch (error) {
          console.error('Error fetching playlist videos:', error);
        }
      };
  
      fetchPlaylistVideos();
    }, []);
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