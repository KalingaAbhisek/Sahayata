import React, { useEffect, useState, memo }from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import SignOut from '../Navigation/SignOut'
import './SemesterMaterialsCSS.css'

const SemesterMaterials = () => {
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
    <div className='semestermaterials'>
        <header className='header-sms'>
            <div className="header-left-sm">
                <h1 className="sm-h1"><a className="sm-a" href="/">SAHAYATA</a></h1>
                <p className="sm-h">A comprehensive portal.</p>
            </div>
            <nav className='nav-sm'>
                <ul className='sm-ul'>
                    <li className='sm-li'><a href="/">Home</a></li>
                    <SignOut />
                </ul>
            </nav>
        </header>

        <main className='main-sm'>
            <section className="semester-materials">
                <div className="container1">
                    <h1 className="sm-h1">Semester Materials</h1>
                    <div className="card-group">
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Core Subjects</h3>
                                <p className="sm-h">Explore curated Playlist for different subjects in different semester which required for both placements and exams</p>
                                <a href="/core-subjects" className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Semester 1</h3>
                                <p className="sm-h">Explore curated materials for Semester 1.</p>
                                <a href="https://github.com/kaal-coder/1st-Semester-Assignments" className="btn-primary sm-a">View
                                    Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Semester 2</h3>
                                <p className="sm-h">Explore curated materials for Semester 2.</p>
                                <a href="/#" className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Semester 3</h3>
                                <p className="sm-h">Explore curated materials for Semester 3.</p>
                                <a href="/#" className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Semester 4</h3>
                                <p className="sm-h">Explore curated materials for Semester 4.</p>
                                <a href="https://kaal-coder.github.io/4thSemester/"
                                    className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Semester 5</h3>
                                <p className="sm-h">Explore curated materials for Semester 5.</p>
                                <a href="https://kaal-coder.github.io/5thSemester/" className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Semester 6</h3>
                                <p className="sm-h">Explore curated materials for Semester 6.</p>
                                <a href="https://kaal-coder.github.io/6thSemester/" className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Semester 7</h3>
                                <p className="sm-h">Explore curated materials for Semester 7.</p>
                                <a href="https://subham-coder25.github.io/7thSemester/" className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Semester 8</h3>
                                <p className="sm-h">Explore curated materials for Semester 8.</p>
                                <a href="/#" className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                        <div className="card-sm">
                            <div className="card-body-sm">
                                <h3>Question Papers Bank</h3>
                                <p className="sm-h">Explore the questions of previous papers of different semesters.</p>
                                <a href="/#" className="btn-primary sm-a">View Materials</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer className='footer-sm'>
            <div className="container-sm">
                <p className="sm-h">&copy; 2024 Sahayata. All rights reserved.</p>
            </div>
        </footer>
    </div>
  )
}

export default memo(SemesterMaterials)