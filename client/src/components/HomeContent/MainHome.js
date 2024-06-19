import React, { useEffect, useState, useCallback } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import SignOut from '../Navigation/SignOut';
import './MainHomeCSS.css';

const MainHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
  }, [navigate]);
  fetch('https://sahayata-backend-b12m.onrender.com/api/notice')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const noticeBoard = document.getElementById('notice-board');
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    data.forEach(notice => {
      const listItem = document.createElement('li');
      listItem.className = 'notice-item';
      listItem.innerHTML = `<a className="mainanch" href="https://www.soa.ac.in${notice.link}" target="_blank">${notice.title}</a>`;
      noticeBoard.appendChild(listItem);
    });

    const container = document.querySelector('.notice-board-container');
    let scrollPos = 0;
    const scrollSpeed = 40; 

    function scrollNoticeBoard() {
      if (container.scrollTop === (container.scrollHeight - container.offsetHeight)) {
        container.scrollTop = 0;
        scrollPos = 0;
      } else {
        container.scrollTop += 1;
        scrollPos++;
      }

      setTimeout(scrollNoticeBoard, scrollSpeed);
    }

    setTimeout(scrollNoticeBoard, 2000);
  })
  .catch(error => console.error('Error fetching data:', error));


  return (
    <div className='mainhomediv'>
      <header className='mainhomeheader'>
        <div className="header-left-mh">
          <h1 className='mainh1'><a className="mainanch" href="/">SAHAYATA</a></h1>
          <p className="mainp">A comprehensive portal.</p>
        </div>
        <nav className="header-right-mh">
          <ul className='mainhomesignoutbtn'>
            <SignOut />
          </ul>
        </nav>
      </header>
      {user && <p className="mainp">Welcome, {user.displayName}</p>}
      <main className='mainhomemaincomp'>
        <section className="button-section-mh">
          <div className="button-container-mh">
            <button className="btn-mh" onClick={() => handleNavigation('/semester-materials')}>Semester Materials</button>
            <button className="btn-mh" onClick={() => handleNavigation('/dsa')}>All-in-One DSA</button>
            <button className="btn-mh" onClick={() => handleNavigation('/contests')}>Coding Contests</button>
            <button className="btn-mh" onClick={() => handleNavigation('/aptitude')}>Aptitude</button>
            <button className="btn-mh" onClick={() => handleNavigation('/roadmaps')}>Roadmaps</button>
            <button className="btn-mh" onClick={() => window.location.href='https://www.soa.ac.in/academic-curriculum'}>Academic Curriculum</button>
          </div>
        </section>
        <div className="notice-board-container">
          <div className="sticky-header">
            <h2 className='mainh2'>College Notices</h2>
          </div>
          <ul id="notice-board"></ul>
        </div>
      </main>
      <button className="jobs-button" id="jobs-button" onClick={() => handleNavigation('/jobs')}><b>JOBS</b></button>
      <div className="bottom-buttons">
        <button className="bottom-btn" onClick={() => window.location.href='https://soaportals.com/StudentPortalSOA/#/'}>Student Portal</button>
        <button className="bottom-btn" onClick={() => handleNavigation('/about-us')}>About Us</button>
        <button className="bottom-btn" onClick={() => handleNavigation('/contact-us')}>Contact Us</button>
      </div>
    </div>
  );
}

export default React.memo(MainHome);
