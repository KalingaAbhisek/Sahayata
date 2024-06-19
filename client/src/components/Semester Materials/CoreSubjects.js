import React, { useEffect, useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import SignOut from '../Navigation/SignOut';
import axios from 'axios';
import './CoreSubjects.css'

const CoreSubjects = () => {
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
            window.open(`/core-subjects?topic=${playlistName}&playlistId=${playlistId}`, '_blank');
          } catch (error) {
            console.error('Error fetching:', error);
          }
      }, []);
  return (
    <div className='coresubjects'>
    <header className='coresubjectsheader'>
      <div className="header-left-cs">
        <h1 className="cs-h1"><a className='cs-a' href="/">SAHAYATA</a></h1>
        <p className="cs-p">A comprehensive portal.</p>
      </div>
      <nav className='nav-cs'>
        <ul className='cs-ul'>
          <li className="cs-li"><a className='cs-a' href="/">Home</a></li>
          <SignOut />
        </ul>
      </nav>
    </header>

    <main className='main-cs'>
      <section className="semester-materials">
        <div className="container1">
          <h1 className="cs-h1">Core Subjects</h1>
          <div className="card-group-cs">
            {[
              { title: 'Computer Organisation and Architecture', playlist: 'coa', imageUrl: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20211116123009/Quantitative-Aptitude-Concepts-Questions-and-Explanation.png' },
              { title: 'Algorithm Design', playlist: 'ad', imageUrl: 'https://i.ytimg.com/vi/u74iQ-VK464/maxresdefault.jpg' },
              { title: 'Operating System', playlist: 'os', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20230304225601/Verbal-Ability.png' },
              { title: 'Computer Networking', playlist: 'cn', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20230304225601/Verbal-Ability.png' },
              { title: 'Database Management System', playlist: 'dbms', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20230304225601/Verbal-Ability.png' },
              { title: 'Compiler Designing', playlist: 'compiler-design', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20230304225601/Verbal-Ability.png' }
            ].map((subject, index) => (
              <div className="card-cs" key={index}>
                <div className="card-body-cs">
                  <h3 className="cs-h3">{subject.title}</h3>
                  <p className="cs-p">Explore the curated Playlist</p>
                  <button
                    onClick={() => redirectToPlaylist(subject.playlist)}
                    className="btn-primary-cs cs-a"
                  >
                    Start Watching
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>

    <footer className='footer-cs'>
      <div className="container-cs">
        <p className="cs-p">&copy; 2024 Sahayata. All rights reserved.</p>
      </div>
    </footer>
  </div>
  )
}

export default CoreSubjects