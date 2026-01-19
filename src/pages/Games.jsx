import React, { useState, useEffect } from 'react';
import './Games.css';
import { Brain, RefreshCw, Trophy, Code2, ArrowLeft, Database, Trash2, Share2 } from 'lucide-react';
import { questions } from '../data/questions';

function Games() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameMode, setGameMode] = useState(null); // 'iq', 'coding', 'dsa'
    const [answeredQuestions, setAnsweredQuestions] = useState({
        iq: [],
        coding: [],
        dsa: []
    });

    // Load progress from LocalStorage on mount
    useEffect(() => {
        const savedProgress = localStorage.getItem('gubu_games_progress');
        if (savedProgress) {
            setAnsweredQuestions(JSON.parse(savedProgress));
        }
    }, []);

    // Save progress to LocalStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('gubu_games_progress', JSON.stringify(answeredQuestions));
    }, [answeredQuestions]);

    const getRandomQuestion = (mode) => {
        const modeQuestions = questions[mode];
        const answeredIds = answeredQuestions[mode] || [];
        const availableQuestions = modeQuestions.filter(q => !answeredIds.includes(q.id));

        if (availableQuestions.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        return availableQuestions[randomIndex];
    };

    const startGame = (mode) => {
        setGameMode(mode);
        setGameStarted(true);
        setScore(0);
        setShowScore(false);
        const nextQ = getRandomQuestion(mode);
        setCurrentQuestion(nextQ);
    };

    const handleAnswerOptionClick = (selectedOption) => {
        if (!currentQuestion) return;

        const isCorrect = selectedOption === currentQuestion.answer;

        if (isCorrect) {
            setScore(score + 1);
        }

        // Mark as answered regardless of correctness (or maybe only if correct? 
        // Requirement says "questions are submited again another question will be provided don not repeating the same questions" 
        // It implies once attempted/completed, it shouldn't repeat. Let's mark as answered.)
        setAnsweredQuestions(prev => ({
            ...prev,
            [gameMode]: [...prev[gameMode], currentQuestion.id]
        }));

        // Move to next question immediately
        // Wait a bit? No, let's just go next for now. Use a small timeout for better UX if needed.
        const nextQ = getRandomQuestion(gameMode);

        // Ensure we don't pick the one we just answered (it's already added to state, but state update might be async)
        // Actually, the next render will handle showing 'all done' if saved. 
        // But for *immediate* next, we need to filter carefully or rely on React state update cycle.
        // Let's just set it. If it was the last one, nextQ will be null (but we need to refresh logic based on new state).
        // Since state update is async, 'answeredQuestions' here is old. 
        // Let's calculate next one manually.

        const modeQuestions = questions[gameMode];
        const currentAnswered = answeredQuestions[gameMode];
        const updatedAnswered = [...currentAnswered, currentQuestion.id];

        const availableQuestions = modeQuestions.filter(q => !updatedAnswered.includes(q.id));

        if (availableQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            setCurrentQuestion(availableQuestions[randomIndex]);
        } else {
            setShowScore(true);
            setCurrentQuestion(null);
        }
    };

    const goBackToMenu = () => {
        setGameMode(null);
        setGameStarted(false);
        setShowScore(false);
        setScore(0);
        setCurrentQuestion(null);
    };

    const resetProgress = () => {
        if (window.confirm("Are you sure you want to reset all your progress? logic")) {
            const emptyProgress = { iq: [], coding: [], dsa: [] };
            setAnsweredQuestions(emptyProgress);
            localStorage.setItem('gubu_games_progress', JSON.stringify(emptyProgress));
        }
    };

    const shareScore = () => {
        const gameTitles = {
            'iq': 'IQ & Logic Challenge',
            'coding': 'Coding Prep Challenge',
            'dsa': 'DSA Challenge'
        };

        const gameTitle = gameTitles[gameMode];
        const total = questions[gameMode].length;
        const percentage = ((score / total) * 100).toFixed(2);
        
        // Create a shareable message with game URL
        const gameUrl = `${window.location.origin}/games?challenge=${gameMode}`;
        const shareMessage = `🎯 I just completed the ${gameTitle}!\n📊 Score: ${score}/${total} (${percentage}%)\n\n🚀 Try it out: ${gameUrl}`;
        
        // Dispatch custom event to trigger post creation
        const event = new CustomEvent('shareGameScore', {
            detail: {
                message: shareMessage,
                gameMode: gameMode,
                score: score,
                total: total
            }
        });
        window.dispatchEvent(event);
        
        // Also use localStorage to communicate with Feed
        localStorage.setItem('lastGameScore', JSON.stringify({
            message: shareMessage,
            timestamp: Date.now()
        }));

        alert('Score message copied! Navigate to Feed to post it.');
    };

    // Helper to get stats
    const getProgress = (mode) => {
        const total = questions[mode].length;
        const answered = answeredQuestions[mode]?.length || 0;
        return `${answered}/${total}`;
    };

    return (
        <div className="games">
            <div className="games__container">
                <div className="games__header">
                    {(gameMode || gameStarted) && (
                        <ArrowLeft className="games__back" onClick={goBackToMenu} size={24} />
                    )}

                    {gameMode === 'coding' && <Code2 size={40} className="games__icon" />}
                    {gameMode === 'iq' && <Brain size={40} className="games__icon" />}
                    {gameMode === 'dsa' && <Database size={40} className="games__icon" />}
                    {!gameMode && <Brain size={40} className="games__icon" />}

                    <h1>
                        {gameMode === 'coding' ? "Coding Prep" :
                            gameMode === 'iq' ? "IQ & Logic" :
                                gameMode === 'dsa' ? "DSA Challenge" :
                                    "Skill Assessment"}
                    </h1>
                </div>

                {!gameStarted ? (
                    <div className="games__menu">
                        <h2>Select a Challenge</h2>
                        <div className="games__menu-options">
                            <div className="games__menu-card" onClick={() => startGame('iq')}>
                                <Brain size={50} />
                                <h3>IQ & Logic</h3>
                                <p>Reasoning Skills</p>
                                <span className="games__progress">Completed: {getProgress('iq')}</span>
                            </div>
                            <div className="games__menu-card" onClick={() => startGame('coding')}>
                                <Code2 size={50} />
                                <h3>Coding</h3>
                                <p>React & JS</p>
                                <span className="games__progress">Completed: {getProgress('coding')}</span>
                            </div>
                            <div className="games__menu-card" onClick={() => startGame('dsa')}>
                                <Database size={50} />
                                <h3>DSA</h3>
                                <p>Algos & Structures</p>
                                <span className="games__progress">Completed: {getProgress('dsa')}</span>
                            </div>
                        </div>

                        <div className="games__footer">
                            <button className="games__reset-btn" onClick={resetProgress}>
                                <Trash2 size={16} /> Reset Progress
                            </button>
                        </div>
                    </div>
                ) : showScore ? (
                    <div className="games__score-section">
                        <Trophy size={50} className="games__trophy" />
                        <h2>Category Complete!</h2>
                        <p>You have answered all available questions in this category.</p>
                        <p>Score for this session: {score}</p>
                        <div className="games__score-actions">
                            <button onClick={goBackToMenu}>
                                Select Another Category
                            </button>
                            <button className="games__share-btn" onClick={shareScore}>
                                <Share2 size={16} /> Share Score
                            </button>
                        </div>
                    </div>
                ) : currentQuestion ? (
                    <>
                        <div className="games__question-section">
                            <div className="games__question-count">
                                <span>Question ID: {currentQuestion.id}</span>
                            </div>
                            <div className="games__question-text">{currentQuestion.question}</div>
                            <div className="games__score-live">Session Score: {score}</div>
                        </div>
                        <div className="games__answer-section">
                            {currentQuestion.options.map((option, index) => (
                                <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="games__score-section">
                        <Trophy size={50} className="games__trophy" />
                        <h2>All Caught Up!</h2>
                        <p>You have answered all questions in the {gameMode} category.</p>
                        <button onClick={goBackToMenu}>
                            Back to Menu
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Games;
