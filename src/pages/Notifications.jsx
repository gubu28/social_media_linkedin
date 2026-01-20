import React, { useEffect } from 'react';
import './Notifications.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotifications, clearUnread } from '../features/notificationSlice';
import { Bell, ThumbsUp, MessageCircle, Share2, User } from 'lucide-react';

function Notifications() {
    const notifications = useSelector(selectNotifications);
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear unread count when viewing notifications
        dispatch(clearUnread());
    }, [dispatch]);

    const getIcon = (type) => {
        switch (type) {
            case 'like': return <ThumbsUp size={20} color="#0a66c2" />;
            case 'comment': return <MessageCircle size={20} color="#057642" />;
            case 'share': return <Share2 size={20} color="#915907" />;
            default: return <Bell size={20} color="gray" />;
        }
    };

    return (
        <div className="notifications">
            <div className="notifications__header">
                <h2>Notifications</h2>
            </div>

            <div className="notifications__body">
                {notifications.length === 0 ? (
                    <div className="notifications__empty">
                        <Bell size={64} color="lightgray" />
                        <p>No new notifications yet.</p>
                    </div>
                ) : (
                    notifications.map((notif, index) => (
                        <div key={index} className="notification__item">
                            <div className="notification__icon">
                                {getIcon(notif.type)}
                            </div>
                            <div className="notification__content">
                                <div className="notification__avatar">
                                    <User size={30} />
                                </div>
                                <div className="notification__text">
                                    <p>
                                        <strong>{notif.userName}</strong> {notif.action}
                                    </p>
                                    <span className="notification__time">{notif.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Notifications;
