import React from 'react';
import './Placement.css';
import { Briefcase, BookOpen, CheckCircle, Clock } from 'lucide-react';

function Placement() {
    return (
        <div className="placement">
            <div className="placement__header">
                <div>
                    <h2>Placement Monitoring</h2>
                    <p>Track your placement status and upskill for your dream job.</p>
                </div>
                <Briefcase size={30} color="#0a66c2" />
            </div>

            <div className="placement__section">
                <h3 className="placement__title">
                    <CheckCircle size={20} color="green" />
                    College Placement Status
                </h3>
                <table className="placement__table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Google</td>
                            <td>Software Engineer</td>
                            <td>Oct 2025</td>
                            <td><span className="placement__status placed">Selected</span></td>
                        </tr>
                        <tr>
                            <td>Microsoft</td>
                            <td>SDE I</td>
                            <td>Sept 2025</td>
                            <td><span className="placement__status training">Interviewing</span></td>
                        </tr>
                        <tr>
                            <td>Amazon</td>
                            <td>Cloud Associate</td>
                            <td>Aug 2025</td>
                            <td><span className="placement__status training">Applied</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="placement__section">
                <h3 className="placement__title">
                    <BookOpen size={20} color="#E7A33E" />
                    Training Path Suggestions
                </h3>
                <div className="placement__path">
                    <div className="placement__pathItem">
                        <div className="placement__pathIcon">🚀</div>
                        <div className="placement__pathInfo">
                            <h4>Full Stack Web Development</h4>
                            <p>Master React, Node.js, and Database technologies.</p>
                        </div>
                        <div className="placement__progress">
                            <span>75%</span>
                            <div className="placement__progressBar">
                                <div className="placement__progressFill" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="placement__pathItem">
                        <div className="placement__pathIcon">🧠</div>
                        <div className="placement__pathInfo">
                            <h4>Data Structures & Algorithms</h4>
                            <p>Ace your coding interviews with optimized solutions.</p>
                        </div>
                        <div className="placement__progress">
                            <span>40%</span>
                            <div className="placement__progressBar">
                                <div className="placement__progressFill" style={{ width: '40%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="placement__pathItem">
                        <div className="placement__pathIcon">☁️</div>
                        <div className="placement__pathInfo">
                            <h4>Cloud Computing (AWS/Azure)</h4>
                            <p>Learn to deploy and manage scalable applications.</p>
                        </div>
                        <div className="placement__progress">
                            <span>10%</span>
                            <div className="placement__progressBar">
                                <div className="placement__progressFill" style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Placement;
