import React from 'react';
import './Profile.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { User, Pen } from 'lucide-react';

function Profile() {
    const user = useSelector(selectUser);

    return (
        <div className="profile">
            <div className="profile__top">
                <div className="profile__background"></div>
                <div className="profile__avatar">
                    {user?.photoUrl ? <img src={user.photoUrl} alt="" /> : <User size={80} color="gray" />}
                </div>
                <div className="profile__info">
                    <div className="profile__infoLeft">
                        <h2>{user?.displayName}</h2>
                        <p>Software Engineer at Gubu Space</p>
                        <span>Chennai, Tamil Nadu, India • <span className="profile__contact">Contact info</span></span>
                    </div>
                    <div className="profile__infoRight">
                        <Pen size={20} />
                    </div>
                </div>

                <div className="profile__actions">
                    <button className="profile__openTo">Open to</button>
                    <button className="profile__addSection">Add profile section</button>
                    <button className="profile__more">More</button>
                </div>
            </div>

            <div className="profile__section">
                <div className="profile__sectionHeader">
                    <h3>About</h3>
                    <Pen size={18} />
                </div>
                <p>Passionate software developer with experience in React, Node.js, and building scalable web applications. Currently building the next generation professional network, Gubu Space.</p>
            </div>

            <div className="profile__section">
                <div className="profile__sectionHeader">
                    <h3>Experience</h3>
                    <Pen size={18} />
                </div>
                <div className="profile__experience">
                    <div className="profile__expLogo"></div>
                    <div>
                        <h4>Senior Frontend Developer</h4>
                        <p>Gubu Tech</p>
                        <span>Jan 2023 - Present • 3 yrs 1 mo</span>
                        <p className="profile__expDesc">Leading the frontend team to build high-performance React applications.</p>
                    </div>
                </div>
            </div>

            <div className="profile__section">
                <div className="profile__sectionHeader">
                    <h3>Education</h3>
                    <Pen size={18} />
                </div>
                <div className="profile__experience">
                    <div className="profile__expLogo univ"></div>
                    <div>
                        <h4>University of Technology</h4>
                        <p>Bachelor of Engineering - BE, Computer Science</p>
                        <span>2019 - 2023</span>
                    </div>
                </div>
            </div>

            <div className="profile__section">
                <div className="profile__sectionHeader">
                    <h3>Skills</h3>
                    <Pen size={18} />
                </div>
                <div className="profile__skills">
                    <div className="profile__skill">React.js</div>
                    <div className="profile__skill">Redux</div>
                    <div className="profile__skill">Node.js</div>
                    <div className="profile__skill">JavaScript (ES6+)</div>
                    <div className="profile__skill">CSS3 & HTML5</div>
                    <div className="profile__skill">Git & GitHub</div>
                    <div className="profile__skill">API Development</div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
