import React, { useEffect } from 'react';
import './Toast.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectToast, hideToast } from '../features/notificationSlice';
import { ThumbsUp, MessageCircle, Share2, Info, X } from 'lucide-react';

function Toast() {
    const { message, visible, type } = useSelector(selectToast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [visible, dispatch]);

    if (!visible) return null;

    const getIcon = () => {
        switch (type) {
            case 'like': return <ThumbsUp size={18} />;
            case 'comment': return <MessageCircle size={18} />;
            case 'share': return <Share2 size={18} />;
            default: return <Info size={18} />;
        }
    };

    return (
        <div className={`toast toast--${type}`}>
            <div className="toast__icon">
                {getIcon()}
            </div>
            <div className="toast__message">
                {message}
            </div>
            <button className="toast__close" onClick={() => dispatch(hideToast())}>
                <X size={16} />
            </button>
        </div>
    );
}

export default Toast;
