import React, { forwardRef, useState } from 'react';
import './Post.css';
import { User, ThumbsUp, MessageCircle, Share2, Send } from 'lucide-react';
import InputOption from './InputOption';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, showToast } from '../features/notificationSlice';
import { selectUser } from '../features/userSlice';

const Post = forwardRef(({ name, description, message, photoUrl, onShare }, ref) => {
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);

    const handleAction = (e, type) => {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }

        let action = "";
        switch (type) {
            case 'like':
                setLiked(!liked);
                action = liked ? "removed like from your post" : "liked your post";
                break;
            case 'comment':
                setShowComments(!showComments);
                return; // Don't trigger notification just by showing input
            case 'share':
                action = "shared your post";
                if (onShare) onShare();
                break;
            default: return;
        }

        dispatch(addNotification({
            type,
            userName: currentUser?.displayName || "You",
            action,
            timestamp: new Date().toLocaleTimeString(),
        }));

        dispatch(showToast({
            message: `Post ${type}ed!`,
            type: type
        }));
    };

    const addComment = (e) => {
        if (e) e.preventDefault();
        if (!commentInput) return;

        const newComment = {
            id: Date.now(),
            name: currentUser?.displayName || "You",
            text: commentInput,
            timestamp: new Date().toLocaleTimeString(),
        };

        setComments([newComment, ...comments]);
        setCommentInput('');

        dispatch(addNotification({
            type: 'comment',
            userName: currentUser?.displayName || "You",
            action: `commented: "${commentInput.substring(0, 20)}..."`,
            timestamp: new Date().toLocaleTimeString(),
        }));

        dispatch(showToast({
            message: "Comment posted!",
            type: 'comment'
        }));
    };

    const isVideo = (url) => {
        return url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg'));
    };

    const renderMessageWithLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, index) => {
            if (urlRegex.test(part)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0077B5', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div ref={ref} className="post">
            <div className="post__header">
                <div className="post__avatar">
                    <User />
                </div>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className="post__body">
                <p>{renderMessageWithLinks(message)}</p>
                {photoUrl && (
                    isVideo(photoUrl) ? (
                        <video controls width="100%" style={{ marginTop: '10px', borderRadius: '10px' }}>
                            <source src={photoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img src={photoUrl} alt="Post content" />
                    )
                )}
            </div>

            <div className="post__buttons">
                <div onClick={(e) => handleAction(e, 'like')} style={{ flex: 1 }}>
                    <InputOption Icon={ThumbsUp} title="Like" color={liked ? "#0a66c2" : "gray"} />
                </div>
                <div onClick={(e) => handleAction(e, 'comment')} style={{ flex: 1 }}>
                    <InputOption Icon={MessageCircle} title="Comment" color="gray" />
                </div>
                <div onClick={(e) => handleAction(e, 'share')} style={{ flex: 1 }}>
                    <InputOption Icon={Share2} title="Share" color="gray" />
                </div>
                <div onClick={(e) => handleAction(e, 'send')} style={{ flex: 1 }}>
                    <InputOption Icon={Send} title="Send" color="gray" />
                </div>
            </div>

            {showComments && (
                <div className="post__commentsSection">
                    <div className="post__commentInput">
                        <User size={20} />
                        <form onSubmit={addComment}>
                            <input
                                value={commentInput}
                                onChange={e => setCommentInput(e.target.value)}
                                placeholder="Add a comment..."
                                type="text"
                            />
                            <button type="submit">Post</button>
                        </form>
                    </div>

                    <div className="post__commentsList">
                        {comments.map(comment => (
                            <div key={comment.id} className="post__comment">
                                <User size={20} className="post__commentAvatar" />
                                <div className="post__commentContent">
                                    <div className="post__commentHeader">
                                        <strong>{comment.name}</strong>
                                        <span>{comment.timestamp}</span>
                                    </div>
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default Post;
