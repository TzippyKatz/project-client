import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetDiets } from '../components/diets/GetDiets';
import { RootState } from '../redux/store';
import './HomePage.css';

const HomePage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>ברוכים הבאים לאתר מעקב תזונה</h1>
                {user ? (
                    <p className="welcome-message">
                        שלום {user.userName}, מה חדש בעולם הבריאות שלך היום?
                    </p>
                ) : (
                    <div className="guest-message">
                        <p>הצטרף לקהילת הבריאות שלנו!</p>
                        <Link to="/login" className="login-link">התחבר עכשיו</Link>
                    </div>
                )}
            </header>

            <div className="home-content">
                <main className="main-content">
                    <section className="connect-section">
                        <h2>צור קשר</h2>
                        <Link to="/login" className="login-link">צור קשר</Link>
                    </section>
                </main>

                <aside className="side-content">
                    {user ? (
                        <section className="challenges-section">
                            <h2>אודות</h2>
                            <GetDiets />
                        </section>
                    ) : (
                        <section className="login-prompt">
                            <h2>התאמת ארוחה לאורח חיים בריא</h2>
                            <p>התחבר כדי להתאים ארוחה בריאה המתאימה לאורח חייך</p>
                            <ul className="features-list">
                                <li>עקוב אחר ההתקדמות שלך</li>
                                <li>החלף דיאטות כל תקופה</li>
                                <li>עקוב אחר דיאטות חדשות</li>
                            </ul>
                            <Link to="/login" className="login-button">התחבר עכשיו</Link>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default HomePage; 