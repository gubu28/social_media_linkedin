import React from 'react';
import './Network.css';
import { UserPlus, User } from 'lucide-react';

function Network() {
    const people = [
        { name: "Satya Nadella", role: "CEO at Microsoft", mutual: 12 },
        { name: "Sundar Pichai", role: "CEO at Google", mutual: 45 },
        { name: "Tim Cook", role: "CEO at Apple", mutual: 3 },
        { name: "Mark Zuckerberg", role: "CEO at Meta", mutual: 99 },
        { name: "Jeff Bezos", role: "Chairman at Amazon", mutual: 1 },
        { name: "Jensen Huang", role: "CEO at NVIDIA", mutual: 22 },
    ];

    return (
        <div className="network">
            <div className="network__sidebar">
                <h4>Manage my network</h4>
                <div className="network__sidebarItem">
                    <User size={20} />
                    <span>Connections</span>
                    <span className="network__count">1,234</span>
                </div>
                <div className="network__sidebarItem">
                    <UserPlus size={20} />
                    <span>Followers</span>
                    <span className="network__count">567</span>
                </div>
            </div>

            <div className="network__main">
                <div className="network__invitations">
                    <h3>No pending invitations</h3>
                </div>

                <div className="network__suggestions">
                    <h3>People you may know from Gubu Space</h3>
                    <div className="network__grid">
                        {people.map((person, index) => (
                            <div className="network__card" key={index}>
                                <div className="network__cardBackground"></div>
                                <div className="network__cardAvatar">
                                    <User size={40} />
                                </div>
                                <h4>{person.name}</h4>
                                <p>{person.role}</p>
                                <span className="network__mutual">{person.mutual} mutual connections</span>
                                <button>Connect</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Network;
