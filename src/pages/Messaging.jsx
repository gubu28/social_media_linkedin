import React, { useState } from 'react';
import './Messaging.css';
import { Search, MoreHorizontal, Edit, Image, Paperclip, Send, User } from 'lucide-react';

function Messaging() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey! How is the project going?", sender: "them" },
        { id: 2, text: "It's going great! Just finished the Router setup.", sender: "me" },
        { id: 3, text: "Awesome, can't wait to see it.", sender: "them" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input) return;
        setMessages([...messages, { id: Date.now(), text: input, sender: "me" }]);
        setInput("");
    };

    return (
        <div className="messaging">
            <div className="messaging__sidebar">
                <div className="messaging__sidebarHeader">
                    <h3>Messaging</h3>
                    <div>
                        <MoreHorizontal />
                        <Edit />
                    </div>
                </div>
                <div className="messaging__search">
                    <Search size={15} />
                    <input type="text" placeholder="Search messages" />
                </div>

                <div className="messaging__list">
                    <div className="messaging__item active">
                        <div className="messaging__avatar">
                            <User />
                        </div>
                        <div className="messaging__info">
                            <h4>Elon Musk</h4>
                            <p>Awesome, can't wait to see it.</p>
                        </div>
                        <div className="messaging__date">Today</div>
                    </div>
                    <div className="messaging__item">
                        <div className="messaging__avatar">
                            <User />
                        </div>
                        <div className="messaging__info">
                            <h4>Bill Gates</h4>
                            <p>Let's connect soon.</p>
                        </div>
                        <div className="messaging__date">Yesterday</div>
                    </div>
                </div>
            </div>

            <div className="messaging__chat">
                <div className="messaging__chatHeader">
                    <div className="messaging__chatHeaderInfo">
                        <h3>Elon Musk</h3>
                        <p>CEO at Tesla</p>
                    </div>
                    <MoreHorizontal />
                </div>

                <div className="messaging__chatBody">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sender === "me" ? "message__receiver" : ""}`}>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                </div>

                <div className="messaging__chatFooter">
                    <div className="messaging__chatFooterIcons">
                        <Image size={20} />
                        <Paperclip size={20} />
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Write a message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button type="submit" onClick={sendMessage}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Messaging;
