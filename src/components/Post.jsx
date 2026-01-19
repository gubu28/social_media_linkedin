import React, { forwardRef } from 'react';
import './Post.css';
import { User, ThumbsUp, MessageCircle, Share2, Send } from 'lucide-react';
import InputOption from './InputOption';

const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
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
                <InputOption Icon={ThumbsUp} title="Like" color="gray" />
                <InputOption Icon={MessageCircle} title="Comment" color="gray" />
                <InputOption Icon={Share2} title="Share" color="gray" />
                <InputOption Icon={Send} title="Send" color="gray" />
            </div>
        </div>
    );
});

export default Post;
