import React, { useState, useEffect, useCallback } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import * as CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './InitialHomeCSS.css';
import logo from './Kalinga.jpg';
import logo1 from './Pradosh.jpg';
import logo2 from './Pratyush.jpg';
import logo3 from './Rishi.jpg';

const InitialHome = React.memo(() => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        navigate('/home', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const buttonHandler = useCallback(async (e) => {
    e.stopPropagation();
    try {
      const result = await signInWithPopup(auth, provider);
      const encryptedEmail = encrypt(result.user.email);
      localStorage.setItem('email', encryptedEmail);
      toast.success('Signed In Successfully !!!', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        onClose: () => navigate('/home')
      });
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast.error('Something went wrong !!!', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
  }, [navigate]);

  const encrypt = useCallback((plainText) => {
    const cipherText = CryptoJS.AES.encrypt(plainText, auth.currentUser.email).toString();
    return cipherText;
  }, []);

  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessMessage(true);
        event.target.reset();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  }, []);

  return (
   <div className='initialhomemaindiv'>
        <header className='initialhomeheader'>
        <div className="header-left-ih">
            <h1 className='inih1'><a className="inia" href="/">SAHAYATA</a></h1>
            <p className="inip">A comprehensive portal.</p>
        </div>
        <nav className="header-right-ih">
            <button className="google-signin" onClick={(e)=>buttonHandler(e)}>Sign in with Google</button>
        </nav>
    </header>
    <main className="main-content-ih">
        <section className="intro-section-ih">
            <div className="intro-text-ih">
                <h2 className="fade1 inih2" style={{color: '#423FE5;'}}>Made by students.<br /></h2>
                <h2 className="fade2 inih2" style={{color: '#423FE5;'}}>Made for students.<br /></h2>
                <h2 className="fade3 inih2" style={{color: '#423FE5;'}}>Made in SOA.</h2><br />
                <p className="inip"><b>Sahayata is an all-around collection of academic resources, semester-wise study materials,
                        coding contest tracker, roadmap provider, job/internship opportunities finder, and much more
                        made specifically for CSE/IT students.</b></p>
            </div>
        </section>
        <section className="cards-section-ih">
            <div className="card-ih">
                <h3 className="h3-ih">Academic Resources</h3>
                <p className="inip">Access a wide range of academic materials.</p>
            </div>
            <div className="card-ih">
                <h3 className="h3-ih">Coding Contests</h3>
                <p className="inip">Stay updated with the latest coding contests.</p>
            </div>
            <div className="card-ih">
                <h3 className="h3-ih">Job Opportunities</h3>
                <p className="inip">Find your dream job or internship.</p>
            </div>
            <div className="card-ih">
                <h3 className="h3-ih">Placement Guidance</h3>
                <p className="inip">Access a wide range of materials to prepare for placement.</p>
            </div>
        </section>
    </main>
    <div id="popup" className="popup">
        <div className="popup-content">
            <h2 className='inih2'>Welcome to Sahayata!</h2>
            <p className="inip">Sign in to access our full range of features and resources tailored for CSE/IT students.</p>
            <button className="close-popup">Close</button>
        </div>
    </div>
    <section className="team">
        <h2 className='inih2'>Our Team</h2>
        <div className="team-section">
            <div className="team-member">
                <img src={logo} alt="Kalinga Abhisek" />
                <h3 className="h3-ih">Kalinga Abhisek</h3>
                <p className="inip">CSE, Final Year</p>
            </div>
            <div className="team-member">
                <img src={logo1} alt="Pradosh Panda" />
                <h3 className="h3-ih">Pradosh Panda</h3>
                <p className="inip">CSE, Final Year</p>
            </div>
            <div className="team-member">
                <img src={logo3} alt="Rishikesh Beura" />
                <h3 className="h3-ih">Rishikesh Beura</h3>
                <p className="inip">CSE, Final Year</p>
            </div>
            <div className="team-member">
                <img src={logo2} alt="Pratush Ranjan Parida" />
                <h3 className="h3-ih">Pratyush Ranjan Parida</h3>
                <p className="inip">CSE, Final Year</p>
            </div>
        </div>
    </section>
    <section id="contact">
        <div className="contact-container">
            <h2 className='inih2'>Contact Us</h2>
            <div className="success-message" id="successMessage">Message sent successfully!</div>
            <form action="https://api.web3forms.com/submit" method="POST" id="contactForm">
                <input type="hidden" name="access_key" value="f970b36d-2a42-4ce0-a91e-0e6913f5c2fb" />
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required />
                </div>
                <div className="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={()=>handleFormSubmit()}>Send Message</button>
                </div>
            </form>
        </div>
    </section>
    <footer className='initialhomefooter'>
        <div className="footer-content">
            <p className="inip">&copy; 2024 Sahayata. All rights reserved.</p>
        </div>
    </footer>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
   </div>
  );
});

export default InitialHome;
