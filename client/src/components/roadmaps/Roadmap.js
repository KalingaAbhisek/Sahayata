import React, { useEffect, useState, memo }from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import SignOut from '../Navigation/SignOut';
import './Roadmap.css'

const Roadmap = () => {
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
  return (
    <div className='roadmap'>
   <header class="site-header">
        <div class="header-left-roadmap">
            <h1 class="site-title-roadmap"><a href="../index.html" class="site-title-link-roadmap"><b>SAHAYATA</b></a>
            </h1>
            <p class="site-description-roadmap">A comprehensive portal.</p>
        </div>
        <nav class="header-right-roadmap">
            <ul class="navigation-list-roadmap">
                <li class="navigation-item-roadmap"><a href="../index.html" class="navigation-link-roadmap">Home</a>
                </li>
                <li class="navigation-item-roadmap"><a href="/#" class="navigation-link-roadmap">Log-out</a></li>
            </ul>
        </nav>
    </header>

    <hr class="section-divider-roadmap" />
    <h2 class="roadmap-heading-roadmap">ROADMAP FOR ANY TECH STACK</h2>
    <hr class="section-divider-roadmap" />
    <div class="container">
        <div class="row">
            <div class="col-roadmap">
                <a href="https://roadmap.sh/frontend" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Frontend Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/backend" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Backend Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/full-stack" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Full Stack Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/devops" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">DevOps</h3>
                </a>
            </div>
            <div class="col-roadmap">
                <a href="https://roadmap.sh/datastructures-and-algorithms" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Data Structures</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/android" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Android Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/postgresql-dba" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">PostgreSQL</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/ai-data-scientist" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">AI and Data Scientist</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/blockchain" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Blockchain Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/qa" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">QA (Quality Assurance)</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/software-architect" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Software Architect</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/aspnet-core" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">ASP.NET Core</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/cpp" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">C++ Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/flutter" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Flutter Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/cyber-security" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Cyber Security</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/ux-design" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">UX Design</h3>
                </a>
            </div>
            <div class="col-roadmap">
                <a href="https://roadmap.sh/react-native" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">React Native Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/game-developer" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Game Developer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/technical-writer" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Technical Writer</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/mlops" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">MLOps</h3>
                </a>
            </div>

            <div class="col-roadmap">
                <a href="https://roadmap.sh/datastructures-and-algorithms" rel="noreferrer" class="box-roadmap" target="_blank">
                    <h3 class="roadmap-title-roadmap">Algorithms</h3>
                </a>
            </div>
        </div>
    </div>
    <footer class="site-footer">
        <div class="container">
            <p class="footer-text">&copy; 2024 Sahayata. All rights reserved.</p>
        </div>
    </footer>
    </div>
  )
}

export default memo(Roadmap)