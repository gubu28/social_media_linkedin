import React from 'react';
import './Widgets.css';
import { Info, Circle, Bell, ThumbsUp, MessageCircle, Share2, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectNotifications } from '../features/notificationSlice';

function Widgets() {
    const notifications = useSelector(selectNotifications);
    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <Circle fill="currentColor" size={15} className="widgets__articleIcon" />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>Gubu News</h2>
                <Info />
            </div>

            {newsArticle("Gubu Space Launches", "Top news - 9,999 readers")}
            {newsArticle("React is awesome", "Code - 8,000 readers")}
            {newsArticle("Tesla hits new highs", "Cars - 4,000 readers")}
            {newsArticle("Bitcoin breaks records", "Crypto - 3,500 readers")}
            {newsArticle("Is Redux dead?", "Tech - 123 readers")}

            <div className="widgets__header" style={{ marginTop: '20px' }}>
                <h2>Recent Activity</h2>
                <Bell size={18} />
            </div>

            {notifications.length === 0 ? (
                <p className="widgets__empty">No recent activity</p>
            ) : (
                notifications.slice(0, 5).map((notif, index) => (
                    <div key={index} className="widgets__article">
                        <div className="widgets__articleLeft">
                            {notif.type === 'like' && <ThumbsUp size={15} color="#0a66c2" />}
                            {notif.type === 'comment' && <MessageCircle size={15} color="#057642" />}
                            {notif.type === 'share' && <Share2 size={15} color="#915907" />}
                            {notif.type === 'delete' && <Trash2 size={15} color="#cc1016" />}
                            {!['like', 'comment', 'share', 'delete'].includes(notif.type) && <Bell size={15} color="gray" />}
                        </div>
                        <div className="widgets__articleRight">
                            <h4 style={{ fontSize: '12px' }}>{notif.userName} {notif.action}</h4>
                            <p>{notif.timestamp}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Widgets;
