import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router';


const LoginRegister = () => {
    const containerRef = useRef(null);
    const signInBtnRef = useRef(null);
    const signUpBtnRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const container = containerRef.current;
        const signInBtn = signInBtnRef.current;
        const signUpBtn = signUpBtnRef.current;

        const handleSignUpClick = () => {
            container.classList.add("sign-up-mode");
        };

        const handleSignInClick = () => {
            container.classList.remove("sign-up-mode");
        };

        signUpBtn.addEventListener("click", handleSignUpClick);
        signInBtn.addEventListener("click", handleSignInClick);

        // Clean up pour éviter les fuites mémoire
        return () => {
            signUpBtn.removeEventListener("click", handleSignUpClick);
            signInBtn.removeEventListener("click", handleSignInClick);
        };
    }, []);
    // Formulaires
    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    });

    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password: '',
    });
    
    const user = {
        username: 'admin',
        password: 'admin',


    }
    const handleSignInSubmit = (e) => {
        e.preventDefault();
        console.log('Sign In Data:', signInData);
        if (signInData.username === user.username && signInData.password === user.password) {
            console.log('Login successful');
            navigate('/home');
        } else {
            console.log('Login failed');
            alert('Invalid username or password');
        }

        // TODO: envoyer vers ton API backend
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        console.log('Sign Up Data:', signUpData);
        // TODO: envoyer vers ton API backend
    };


    return (
        <div className="container" ref={containerRef}>

            <div className="forms-container">
                <div className="signin-signup">

                    <form action="#" className="sign-in-form" style={{ marginBottom: '100px' }} onSubmit={handleSignInSubmit} >
                        <div>
                            <img
                                src="./assets/images/logodubai.jpeg"
                                alt="image"
                                style={{ objectFit: 'cover', width: '400px', height: '400px' }}
                            />
                        </div>
                        <h2 className="title">Sign in</h2>

                        <div className="input-field">
                            <i className="fas fa-user" />
                            <input
                                type="text"
                                placeholder="Username"
                                value={signInData.username}
                                onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
                            />
                        </div>

                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={signInData.password}
                                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                            />
                        </div>



                        <input type="submit" defaultValue="Login" className="btn solid" />
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in" />
                            </a>
                        </div>
                    </form>

                    <form action="#" className="sign-up-form" style={{ marginBottom: '100px' }} onSubmit={handleSignUpSubmit}>
                        <div>
                            <img
                                src="./assets/images/logodubai.jpeg"
                                alt="image"
                                style={{ objectFit: 'cover', width: '400px', height: '400px' }}
                            />
                        </div>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user" />
                            <input
                                type="text"
                                placeholder="Username"
                                value={signUpData.username}
                                onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                            />
                        </div>

                        <div className="input-field">
                            <i className="fas fa-envelope" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={signUpData.email}
                                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                            />
                        </div>

                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={signUpData.password}
                                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                            />
                        </div>
                        <input type="submit" className="btn" defaultValue="Sign up" />
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in" />
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid!</p>
                        <button className="btn transparent" ref={signUpBtnRef}>
                            Sign up
                        </button>
                    </div>
                    <img src="./assets/images/log.svg" className="image" alt="Log" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum!</p>
                        <button className="btn transparent" ref={signInBtnRef}>
                            Sign in
                        </button>
                    </div>
                    <img src="./assets/images/register.svg" className="image" alt="Register" />
                </div>
            </div>
        </div>
    );
};


export default LoginRegister;