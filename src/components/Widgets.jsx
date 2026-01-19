import React from 'react';
import './Widgets.css';
import { Info, Circle } from 'lucide-react';

function Widgets() {
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
        </div>
    );
}

export default Widgets;
