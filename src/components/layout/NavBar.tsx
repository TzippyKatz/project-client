import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import logo_dietProject from '../../images/logo_dietProject.png';
import '../global.css'
import { logout } from '../../redux/slices/login.slice';
import { jwtDecode, removeSession } from '../../auth/auth.utils';


const Navbar: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth); const dispatch = useDispatch();
    let token = localStorage.getItem('user')
    let role;
    if (token) {
        const decodedToken = jwtDecode(token)
        role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    }
    else {
        role = null
    }

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        // dispatch(logout());
        removeSession();
        role = null;
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={logo_dietProject} alt="NutriTrack Logo" className="logo-image" />
                    <span className="logo-text">NutriTrack</span>
                </Link>

                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/getDiets" className="nav-link" onClick={() => setMenuOpen(false)}>
                            דיאטות
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
                            אודות
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                            דף הבית
                        </Link>
                    </li>
                    {role && (
                        <>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                                    הפרופיל שלי
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="logout-button" onClick={handleLogout}>
                                    התנתק
                                </button>
                            </li>
                        </>
                    )}
                    {!role && (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                                    התחברות
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link register-link" onClick={() => setMenuOpen(false)}>
                                    הרשמה
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar; 