import React, { useState, useEffect } from 'react';
import './Feed.css';
import { Edit, Image, Video, Calendar, LayoutList } from 'lucide-react';
import InputOption from './InputOption';
import Post from './Post';

function Feed() {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');

    useEffect(() => {
        // Mock data
        setPosts([
            {
                id: 1,
                name: "Guberan S.",
                description: "Software Engineer",
                message: "Just built a LinkedIn clone with React! #reactjs #clone",
                photoUrl: ""
            },
            {
                id: 2,
                name: "Elon Musk",
                description: "CEO of Tesla",
                message: "Gubu Space is going to the moon! 🚀",
                photoUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2669&auto=format&fit=crop"
            },
            {
                id: 3,
                name: "Bill Gates",
                description: "Co-chair, Bill & Melinda Gates Foundation",
                message: "Ideally, this platform connects people worldwide.",
                photoUrl: ""
            }
        ]);

        // Listen for game score shares
        const handleGameShare = () => {
            const lastGameScore = localStorage.getItem('lastGameScore');
            if (lastGameScore) {
                const data = JSON.parse(lastGameScore);
                setInput(data.message);
                localStorage.removeItem('lastGameScore');
            }
        };

        window.addEventListener('shareGameScore', handleGameShare);
        return () => window.removeEventListener('shareGameScore', handleGameShare);
    }, []);

    const sendPost = (e) => {
        e.preventDefault();
        if (!input) return;

        setPosts([{
            id: Date.now(),
            name: "Guberan S.",
            description: "Software Engineer",
            message: input,
            photoUrl: mediaUrl || ""
        }, ...posts]);

        setInput("");
        setMediaUrl("");
    };

    const handleMediaClick = (type) => {
        const url = prompt(`Enter ${type} URL:`);
        if (url) {
            setMediaUrl(url);
        }
    };

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <Edit />
                    <form>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            type="text"
                            placeholder="Start a post"
                        />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                {mediaUrl && (
                    <div className="feed__mediaPreview">
                        <p>Attached: {mediaUrl.substring(0, 30)}...</p>
                        <button onClick={() => setMediaUrl("")}>Remove</button>
                    </div>
                )}
                <div className="feed__inputOptions">
                    <div onClick={() => handleMediaClick("Image")}>
                        <InputOption Icon={Image} title="Photo" color="#70B5F9" />
                    </div>
                    <div onClick={() => handleMediaClick("Video")}>
                        <InputOption Icon={Video} title="Video" color="#E7A33E" />
                    </div>
                    <InputOption Icon={Calendar} title="Event" color="#C0CBCD" />
                    <InputOption Icon={LayoutList} title="Write article" color="#7FC15E" />
                </div>
            </div>

            {posts.map(({ id, name, description, message, photoUrl }) => (
                <Post
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl}
                />
            ))}
        </div>
    );
}

export default Feed;
