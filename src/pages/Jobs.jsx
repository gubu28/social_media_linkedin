import React from 'react';
import './Jobs.css';
import { Briefcase, MapPin, Building } from 'lucide-react';

function Jobs() {
    const jobs = [
        { title: "Senior React Developer", company: "Google", location: "Mountain View, CA", time: "2 hours ago" },
        { title: "Frontend Engineer", company: "Netflix", location: "Remote", time: "5 hours ago" },
        { title: "Full Stack Developer", company: "Gubu Corp", location: "New York, NY", time: "1 day ago" },
        { title: "UI/UX Designer", company: "Apple", location: "Cupertino, CA", time: "2 days ago" },
        { title: "Software Engineer", company: "Tesla", location: "Austin, TX", time: "3 days ago" },
    ];

    return (
        <div className="jobs">
            <div className="jobs__sidebar">
                <div className="jobs__sidebarItem active">
                    <Briefcase size={20} />
                    <span>My Jobs</span>
                </div>
            </div>

            <div className="jobs__main">
                <div className="jobs__header">
                    <h3>Recommended for you</h3>
                    <p>Based on your profile and search history</p>
                </div>

                <div className="jobs__list">
                    {jobs.map((job, index) => (
                        <div className="job" key={index}>
                            <div className="job__logo">
                                <Building size={30} />
                            </div>
                            <div className="job__info">
                                <h3>{job.title}</h3>
                                <h4>{job.company}</h4>
                                <div className="job__details">
                                    <MapPin size={14} />
                                    <span>{job.location}</span>
                                    <span>• {job.time}</span>
                                </div>
                            </div>
                            <button>Easy Apply</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Jobs;
